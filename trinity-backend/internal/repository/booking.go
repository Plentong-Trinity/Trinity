package repository

import (
	"context"
	"database/sql"
	"fmt"
	"strings"

	"github.com/johnman136/Trinity/trinity-backend/internal/db"
	"github.com/johnman136/Trinity/trinity-backend/internal/models"
	"github.com/lib/pq"
)

type BookingRepository struct {
	db *sql.DB
}

func NewBookingRepository() *BookingRepository {
	return &BookingRepository{db: db.DB}
}

func (r *BookingRepository) Create(ctx context.Context, userID string, request models.CreateRoomBookingRequest) (*models.RoomBooking, error) {
	var booking models.RoomBooking
	var endDate sql.NullString
	var denialReason sql.NullString
	var rooms pq.StringArray
	if request.EndDate == "" {
		request.EndDate = request.Date
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
	err := r.db.QueryRowContext(ctx, query,
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
	booking.Room = strings.Join(rooms, ", ")
	booking.EndDate = endDate.String
	booking.Status = normalizeBookingStatus(booking.Status)
	booking.DenialReason = denialReason.String
	return &booking, nil
}

func (r *BookingRepository) List(ctx context.Context) ([]models.RoomBooking, error) {
	query := `
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
		ORDER BY created_at DESC
	`
	rows, err := r.db.QueryContext(ctx, query)
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
