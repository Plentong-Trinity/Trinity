package repository

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/johnman136/Trinity/trinity-backend/internal/db"
	"github.com/johnman136/Trinity/trinity-backend/internal/models"
	"github.com/lib/pq"
)

type BookingRepository struct {
	db *sql.DB
}

var ErrBookingConflict = errors.New("booking conflicts with an existing booking")

const bookingScheduleLockID int64 = 837192401

func NewBookingRepository() *BookingRepository {
	return &BookingRepository{db: db.DB}
}

func LockBookingSchedule(ctx context.Context, tx *sql.Tx) error {
	var lockResult interface{}
	if err := tx.QueryRowContext(ctx, `SELECT pg_advisory_xact_lock($1)`, bookingScheduleLockID).Scan(&lockResult); err != nil {
		return fmt.Errorf("failed to lock booking schedule: %w", err)
	}
	return nil
}

func HasRoomBookingConflict(ctx context.Context, tx *sql.Tx, rooms []string, startOn, endOn time.Time) (bool, error) {
	return hasRoomBookingConflict(ctx, tx, rooms, "$2", "$3", startOn, endOn)
}

func HasLocalRoomBookingConflict(
	ctx context.Context,
	tx *sql.Tx,
	rooms []string,
	startDate, startTime, endDate, endTime string,
) (bool, error) {
	startExpression := "(($2::text || ' ' || $3::text)::timestamp AT TIME ZONE 'Asia/Kuala_Lumpur')"
	endExpression := "(($4::text || ' ' || $5::text)::timestamp AT TIME ZONE 'Asia/Kuala_Lumpur')"
	return hasRoomBookingConflict(
		ctx, tx, rooms, startExpression, endExpression,
		startDate, startTime, endDate, endTime,
	)
}

func hasRoomBookingConflict(
	ctx context.Context,
	tx *sql.Tx,
	rooms []string,
	startExpression, endExpression string,
	args ...interface{},
) (bool, error) {
	query := fmt.Sprintf(`
		SELECT EXISTS (
			SELECT 1
			FROM "Booking"
			WHERE room && $1::varchar[]
				AND start_on < %s
				AND end_on > %s
				AND COALESCE(lower(status::text), 'pending') NOT IN ('denied', 'rejected', 'declined')
		)
	`, endExpression, startExpression)
	queryArgs := append([]interface{}{pq.Array(rooms)}, args...)
	var conflict bool
	if err := tx.QueryRowContext(ctx, query, queryArgs...).Scan(&conflict); err != nil {
		return false, fmt.Errorf("failed to check booking conflicts: %w", err)
	}
	return conflict, nil
}

func (r *BookingRepository) Create(ctx context.Context, userID string, request models.CreateRoomBookingRequest) (*models.RoomBooking, error) {
	var booking models.RoomBooking
	var endDate sql.NullString
	var denialReason sql.NullString
	var rooms pq.StringArray
	if request.EndDate == "" {
		request.EndDate = request.Date
	}

	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to start booking transaction: %w", err)
	}
	defer tx.Rollback()

	if err := LockBookingSchedule(ctx, tx); err != nil {
		return nil, err
	}
	conflict, err := HasLocalRoomBookingConflict(
		ctx, tx, request.Rooms, request.Date, request.StartTime, request.EndDate, request.EndTime,
	)
	if err != nil {
		return nil, err
	}
	if conflict {
		return nil, ErrBookingConflict
	}

	query := `
		INSERT INTO "Booking" (
			name, phone, pax, room, department, description, start_on, end_on, user_id
		)
		SELECT $1, COALESCE(users.phone, ''), $2, $3, $4, $5,
			($6::text || ' ' || $7::text)::timestamp AT TIME ZONE 'Asia/Kuala_Lumpur',
			($8::text || ' ' || $9::text)::timestamp AT TIME ZONE 'Asia/Kuala_Lumpur', $10
		FROM users
		WHERE users.id = $10
		RETURNING id, name, department, room,
			TO_CHAR(start_on AT TIME ZONE 'Asia/Kuala_Lumpur', 'YYYY-MM-DD'),
			TO_CHAR(end_on AT TIME ZONE 'Asia/Kuala_Lumpur', 'YYYY-MM-DD'),
			TO_CHAR(start_on AT TIME ZONE 'Asia/Kuala_Lumpur', 'HH12:MI AM') || ' - ' ||
			TO_CHAR(end_on AT TIME ZONE 'Asia/Kuala_Lumpur', 'HH12:MI AM'),
			description, pax, status::text, COALESCE(deny_reason, '')
	`
	err = tx.QueryRowContext(ctx, query,
		request.Requester, request.Participants, pq.Array(request.Rooms), request.Ministry,
		request.Purpose, request.Date, request.StartTime, request.EndDate, request.EndTime, userID,
	).Scan(
		&booking.ID, &booking.Requester, &booking.Ministry, &rooms, &booking.Date,
		&endDate, &booking.Time, &booking.Purpose, &booking.Participants, &booking.Status,
		&denialReason,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create booking: %w", err)
	}
	if err := tx.Commit(); err != nil {
		return nil, fmt.Errorf("failed to commit booking: %w", err)
	}
	booking.Room = strings.Join(rooms, ", ")
	booking.EndDate = endDate.String
	booking.Status = normalizeBookingStatus(booking.Status)
	booking.DenialReason = denialReason.String
	return &booking, nil
}

const bookingListSelect = `
	SELECT id, name, department, COALESCE(room, ARRAY[]::varchar[]),
		COALESCE(TO_CHAR(start_on AT TIME ZONE 'Asia/Kuala_Lumpur', 'YYYY-MM-DD'), ''),
		COALESCE(TO_CHAR(end_on AT TIME ZONE 'Asia/Kuala_Lumpur', 'YYYY-MM-DD'), ''),
		CASE WHEN start_on IS NULL THEN '' ELSE
			TO_CHAR(start_on AT TIME ZONE 'Asia/Kuala_Lumpur', 'HH12:MI AM') ||
			CASE WHEN end_on IS NULL THEN '' ELSE ' - ' ||
				TO_CHAR(end_on AT TIME ZONE 'Asia/Kuala_Lumpur', 'HH12:MI AM') END
		END,
		description, pax, status::text, COALESCE(deny_reason, '')
	FROM "Booking"
`

func (r *BookingRepository) List(ctx context.Context) ([]models.RoomBooking, error) {
	return r.list(ctx, bookingListSelect+` ORDER BY created_at DESC`)
}

func (r *BookingRepository) ListByUserID(ctx context.Context, userID string) ([]models.RoomBooking, error) {
	return r.list(ctx, bookingListSelect+` WHERE user_id = $1 ORDER BY created_at DESC`, userID)
}

func (r *BookingRepository) DeleteByUserID(ctx context.Context, bookingID, userID string) (bool, error) {
	result, err := r.db.ExecContext(ctx, `DELETE FROM "Booking" WHERE id = $1 AND user_id = $2`, bookingID, userID)
	if err != nil {
		return false, fmt.Errorf("failed to delete booking: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return false, fmt.Errorf("failed to confirm booking deletion: %w", err)
	}
	return rowsAffected > 0, nil
}

func (r *BookingRepository) list(ctx context.Context, query string, args ...any) ([]models.RoomBooking, error) {
	rows, err := r.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, fmt.Errorf("failed to list bookings: %w", err)
	}
	defer rows.Close()

	bookings := make([]models.RoomBooking, 0)
	for rows.Next() {
		var booking models.RoomBooking
		var rooms pq.StringArray
		if err := rows.Scan(
			&booking.ID, &booking.Requester, &booking.Ministry, &rooms, &booking.Date,
			&booking.EndDate, &booking.Time, &booking.Purpose, &booking.Participants,
			&booking.Status, &booking.DenialReason,
		); err != nil {
			return nil, fmt.Errorf("failed to read booking: %w", err)
		}
		booking.Room = strings.Join(rooms, ", ")
		booking.Status = normalizeBookingStatus(booking.Status)
		bookings = append(bookings, booking)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("failed to iterate bookings: %w", err)
	}
	return bookings, nil
}

func (r *BookingRepository) ListCalendarEvents(ctx context.Context, rooms []string) ([]models.CalendarEvent, error) {
	query := `
		SELECT id, COALESCE(NULLIF(description, ''), 'Room booking'), start_on, end_on,
			status::text, COALESCE(array_to_string(room, ', '), ''), COALESCE(description, '')
		FROM "Booking"
		WHERE start_on IS NOT NULL
			AND end_on IS NOT NULL
			AND lower(status::text) NOT IN ('denied', 'rejected', 'declined')
	`
	var rows *sql.Rows
	var err error
	if len(rooms) > 0 {
		query += " AND room && $1::varchar[]"
		query += " ORDER BY start_on"
		rows, err = r.db.QueryContext(ctx, query, pq.Array(rooms))
	} else {
		query += " ORDER BY start_on"
		rows, err = r.db.QueryContext(ctx, query)
	}
	if err != nil {
		return nil, fmt.Errorf("failed to list calendar events: %w", err)
	}
	defer rows.Close()

	events := make([]models.CalendarEvent, 0)
	for rows.Next() {
		var event models.CalendarEvent
		if err := rows.Scan(
			&event.ID, &event.Title, &event.StartTime, &event.EndTime,
			&event.Status, &event.Location, &event.Description,
		); err != nil {
			return nil, fmt.Errorf("failed to read calendar event: %w", err)
		}
		events = append(events, event)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("failed to iterate calendar events: %w", err)
	}
	return events, nil
}

func (r *BookingRepository) UpdateStatus(ctx context.Context, id, status, denialReason string) (*models.RoomBooking, error) {
	databaseStatus, err := r.databaseStatus(ctx, status)
	if err != nil {
		return nil, err
	}

	var booking models.RoomBooking
	var endDate sql.NullString
	var reason sql.NullString
	var rooms pq.StringArray
	query := `
		UPDATE "Booking"
		SET status = $2, deny_reason = NULLIF($3, '')
		WHERE id = $1
		RETURNING id, name, department, room,
			TO_CHAR(start_on AT TIME ZONE 'Asia/Kuala_Lumpur', 'YYYY-MM-DD'),
			TO_CHAR(end_on AT TIME ZONE 'Asia/Kuala_Lumpur', 'YYYY-MM-DD'),
			TO_CHAR(start_on AT TIME ZONE 'Asia/Kuala_Lumpur', 'HH12:MI AM') || ' - ' ||
			TO_CHAR(end_on AT TIME ZONE 'Asia/Kuala_Lumpur', 'HH12:MI AM'),
			description, pax, status::text, COALESCE(deny_reason, '')
	`
	err = r.db.QueryRowContext(ctx, query, id, databaseStatus, denialReason).Scan(
		&booking.ID, &booking.Requester, &booking.Ministry, &rooms, &booking.Date,
		&endDate, &booking.Time, &booking.Purpose, &booking.Participants, &booking.Status,
		&reason,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("booking not found")
		}
		return nil, fmt.Errorf("failed to update booking: %w", err)
	}
	booking.Room = strings.Join(rooms, ", ")
	booking.EndDate = endDate.String
	booking.Status = normalizeBookingStatus(booking.Status)
	booking.DenialReason = reason.String
	return &booking, nil
}

func (r *BookingRepository) databaseStatus(ctx context.Context, status string) (string, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT enumlabel
		FROM pg_enum
		WHERE enumtypid = 'booking_status'::regtype
	`)
	if err != nil {
		return "", fmt.Errorf("failed to read booking statuses: %w", err)
	}
	defer rows.Close()

	var labels []string
	for rows.Next() {
		var label string
		if err := rows.Scan(&label); err != nil {
			return "", fmt.Errorf("failed to read booking status: %w", err)
		}
		labels = append(labels, label)
	}
	if err := rows.Err(); err != nil {
		return "", fmt.Errorf("failed to iterate booking statuses: %w", err)
	}

	for _, label := range labels {
		if label == status {
			return label, nil
		}
	}
	if status == "denied" {
		for _, label := range labels {
			if label == "rejected" || label == "declined" {
				return label, nil
			}
		}
	}
	return "", fmt.Errorf("unsupported booking status: %s", status)
}

func normalizeBookingStatus(status string) string {
	switch status {
	case "rejected", "declined":
		return "denied"
	default:
		return status
	}
}
