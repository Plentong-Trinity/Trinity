package repository

import (
	"context"
	"database/sql"

	"github.com/lib/pq"

	"github.com/johnman136/Trinity/trinity-backend/internal/db"
	"github.com/johnman136/Trinity/trinity-backend/internal/models"
)

type WeekendMassRepository struct {
	db *sql.DB
}

func NewWeekendMassRepository() *WeekendMassRepository {
	return &WeekendMassRepository{db: db.DB}
}

func (r *WeekendMassRepository) List(
	ctx context.Context,
) ([]models.WeekendMass, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT
			id::text,
			COALESCE(languages, ARRAY[]::text[]),
			COALESCE(days_of_week, ARRAY[]::text[]),
			TO_CHAR(mass_time, 'HH24:MI'),
			remarks
		FROM public.mass_schedule
		WHERE mass_type = 'weekend'
		ORDER BY
			languages,
			CASE
				WHEN 'Saturday' = ANY(days_of_week) THEN 1
				WHEN 'Sunday' = ANY(days_of_week) THEN 2
			END,
			mass_time,
			id
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	masses := make([]models.WeekendMass, 0)

	for rows.Next() {
		var mass models.WeekendMass

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

func (r *WeekendMassRepository) Create(
	ctx context.Context,
	input models.WeekendMassInput,
) (*models.WeekendMass, error) {
	mass := &models.WeekendMass{
		WeekendMassInput: input,
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
		VALUES ('weekend', 'Weekend Mass', $1, $2, $3, $4)
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

func (r *WeekendMassRepository) Update(
	ctx context.Context,
	id string,
	input models.WeekendMassInput,
) (*models.WeekendMass, error) {
	mass := &models.WeekendMass{
		WeekendMassInput: input,
	}

	err := r.db.QueryRowContext(ctx, `
		UPDATE public.mass_schedule
		SET languages = $1,
		    days_of_week = $2,
		    mass_time = $3,
		    remarks = $4
		WHERE id = $5
		  AND mass_type = 'weekend'
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

func (r *WeekendMassRepository) Delete(
	ctx context.Context,
	id string,
) error {
	result, err := r.db.ExecContext(ctx, `
		DELETE FROM public.mass_schedule
		WHERE id = $1
		  AND mass_type = 'weekend'
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
