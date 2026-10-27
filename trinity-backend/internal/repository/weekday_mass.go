package repository

import (
	"context"
	"database/sql"

	"github.com/lib/pq"

	"github.com/johnman136/Trinity/trinity-backend/internal/db"
	"github.com/johnman136/Trinity/trinity-backend/internal/models"
)

type WeekdayMassRepository struct {
	db *sql.DB
}

func NewWeekdayMassRepository() *WeekdayMassRepository {
	return &WeekdayMassRepository{db: db.DB}
}

func (r *WeekdayMassRepository) List(
	ctx context.Context,
) ([]models.WeekdayMass, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT
			id::text,
			COALESCE(languages, ARRAY[]::text[]),
			COALESCE(days_of_week, ARRAY[]::text[]),
			TO_CHAR(mass_time, 'HH24:MI'),
			remarks
		FROM public.mass_schedule
		WHERE mass_type = 'weekday'
		ORDER BY
			CASE
				WHEN 'Monday' = ANY(days_of_week) THEN 1
				WHEN 'Tuesday' = ANY(days_of_week) THEN 2
				WHEN 'Wednesday' = ANY(days_of_week) THEN 3
				WHEN 'Thursday' = ANY(days_of_week) THEN 4
				WHEN 'Friday' = ANY(days_of_week) THEN 5
			END,
			mass_time,
			id
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	masses := make([]models.WeekdayMass, 0)

	for rows.Next() {
		var mass models.WeekdayMass

		if err := rows.Scan(
			&mass.ID,
			pq.Array(&mass.Languages),
			pq.Array(&mass.DaysOfWeek),
			&mass.MassTime,
			&mass.Remarks,
		); err != nil {
			return nil, err
		}

		masses = append(masses, mass)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return masses, nil
}

func (r *WeekdayMassRepository) Create(
	ctx context.Context,
	input models.WeekdayMassInput,
) (*models.WeekdayMass, error) {
	mass := &models.WeekdayMass{
		WeekdayMassInput: input,
	}

	err := r.db.QueryRowContext(ctx, `
		INSERT INTO public.mass_schedule (
			mass_type,
			title,
			languages,
			days_of_week,
			mass_time,
			remarks
		)
		VALUES ('weekday', 'Weekday Mass', $1, $2, $3, $4)
		RETURNING id::text
	`,
		pq.Array(input.Languages),
		pq.Array(input.DaysOfWeek),
		input.MassTime,
		input.Remarks,
	).Scan(&mass.ID)

	if err != nil {
		return nil, err
	}

	return mass, nil
}

func (r *WeekdayMassRepository) Update(
	ctx context.Context,
	id string,
	input models.WeekdayMassInput,
) (*models.WeekdayMass, error) {
	mass := &models.WeekdayMass{
		WeekdayMassInput: input,
	}

	err := r.db.QueryRowContext(ctx, `
		UPDATE public.mass_schedule
		SET languages = $1,
		    days_of_week = $2,
		    mass_time = $3,
		    remarks = $4
		WHERE id = $5
		  AND mass_type = 'weekday'
		RETURNING id::text
	`,
		pq.Array(input.Languages),
		pq.Array(input.DaysOfWeek),
		input.MassTime,
		input.Remarks,
		id,
	).Scan(&mass.ID)

	if err != nil {
		return nil, err
	}

	return mass, nil
}

func (r *WeekdayMassRepository) Delete(
	ctx context.Context,
	id string,
) error {
	result, err := r.db.ExecContext(ctx, `
		DELETE FROM public.mass_schedule
		WHERE id = $1
		  AND mass_type = 'weekday'
	`, id)
	if err != nil {
		return err
	}

	count, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if count == 0 {
		return sql.ErrNoRows
	}

	return nil
}
