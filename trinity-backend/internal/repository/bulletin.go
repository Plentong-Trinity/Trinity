package repository

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"

	"github.com/johnman136/Trinity/trinity-backend/internal/db"
)

type BulletinRepository struct {
	db *sql.DB
}

func NewBulletinRepository() *BulletinRepository {
	return &BulletinRepository{db: db.DB}
}

func (r *BulletinRepository) GetLatest(ctx context.Context) (json.RawMessage, error) {
	var bulletin []byte
	err := r.db.QueryRowContext(ctx, `
		SELECT to_jsonb(bulletin)
		FROM public.bulletin AS bulletin
		ORDER BY bulletin.created_at DESC NULLS LAST
		LIMIT 1
	`).Scan(&bulletin)
	if err != nil {
		return nil, fmt.Errorf("failed to load latest bulletin: %w", err)
	}
	return json.RawMessage(bulletin), nil
}

func (r *BulletinRepository) ListLatest(ctx context.Context) ([]json.RawMessage, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT to_jsonb(bulletin)
		FROM public.bulletin AS bulletin
		ORDER BY bulletin.created_at DESC NULLS LAST
		LIMIT 10
	`)
	if err != nil {
		return nil, fmt.Errorf("failed to load bulletins: %w", err)
	}
	defer rows.Close()

	bulletins := make([]json.RawMessage, 0, 10)
	for rows.Next() {
		var bulletin []byte
		if err := rows.Scan(&bulletin); err != nil {
			return nil, fmt.Errorf("failed to scan bulletin: %w", err)
		}
		bulletins = append(bulletins, json.RawMessage(bulletin))
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("failed to iterate bulletins: %w", err)
	}

	return bulletins, nil
}
