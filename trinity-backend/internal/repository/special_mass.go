package repository

import (
	"context"
	"database/sql"

	"github.com/lib/pq"

	"github.com/johnman136/Trinity/trinity-backend/internal/db"
	"github.com/johnman136/Trinity/trinity-backend/internal/models"
)

type SpecialMassRepository struct {
	db *sql.DB
}

func NewSpecialMassRepository() *SpecialMassRepository {
	return &SpecialMassRepository{db: db.DB}
}

func (r *SpecialMassRepository) List(
	ctx context.Context,
) ([]models.SpecialMass, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT
			id::text,
			title,
			COALESCE(languages, ARRAY[]::text[]),
			mass_date::text,
			TO_CHAR(mass_time, 'HH24:MI'),
			remarks
		FROM public.mass_schedule
		WHERE mass_type = 'special'
		ORDER BY
			mass_date,
			mass_time,
			id
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	masses := make([]models.SpecialMass, 0)

	for rows.Next() {
		var mass models.SpecialMass

		if err := rows.Scan(
			&mass.ID,
			&mass.Title,
			pq.Array(&mass.Languages),
			&mass.MassDate,
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

func (r *SpecialMassRepository) Create(
	ctx context.Context,
	input models.SpecialMassInput,
) (*models.SpecialMass, error) {
	mass := &models.SpecialMass{
		SpecialMassInput: input,
	}

	err := r.db.QueryRowContext(ctx, `
		INSERT INTO public.mass_schedule (
			mass_type,
			title,
			languages,
			mass_date,
			mass_time,
			remarks
		)
		VALUES ('special', $1, $2, $3, $4, $5)
		RETURNING id::text
	`,
		input.Title,
		pq.Array(input.Languages),
		input.MassDate,
		input.MassTime,
		input.Remarks,
	).Scan(&mass.ID)

	if err != nil {
		return nil, err
	}

	return mass, nil
}

func (r *SpecialMassRepository) Update(
	ctx context.Context,
	id string,
	input models.SpecialMassInput,
) (*models.SpecialMass, error) {
	mass := &models.SpecialMass{
		SpecialMassInput: input,
	}

	err := r.db.QueryRowContext(ctx, `
		UPDATE public.mass_schedule
		SET title = $1,
		    languages = $2,
		    mass_date = $3,
		    mass_time = $4,
		    remarks = $5
		WHERE id = $6
		  AND mass_type = 'special'
		RETURNING id::text
	`,
		input.Title,
		pq.Array(input.Languages),
		input.MassDate,
		input.MassTime,
		input.Remarks,
		id,
	).Scan(&mass.ID)

	if err != nil {
		return nil, err
	}

	return mass, nil
}

func (r *SpecialMassRepository) Delete(
	ctx context.Context,
	id string,
) error {
	result, err := r.db.ExecContext(ctx, `
		DELETE FROM public.mass_schedule
		WHERE id = $1
		  AND mass_type = 'special'
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
