package db

import (
	"context"
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

// Supabase connection pool
var DB *sql.DB

// InitSupabase initializes the Supabase database connection
func InitSupabase() error {
	// Get Supabase connection string from environment
	supabaseURL := os.Getenv("SUPABASE_URL")
	supabasePgPassword := os.Getenv("SUPABASE_PG_PASSWORD")
	supabasePgUser := os.Getenv("SUPABASE_PG_USER")
	supabasePgDatabase := os.Getenv("SUPABASE_PG_DATABASE")

	if supabaseURL == "" || supabasePgPassword == "" {
		return fmt.Errorf("missing Supabase environment variables")
	}

	// Extract host from Supabase URL (format: https://xxxxx.supabase.co)
	// Supabase provides a PostgreSQL connection string
	connStr := fmt.Sprintf("postgres://%s:%s@db.%s/postgres?sslmode=require",
		supabasePgUser,
		supabasePgPassword,
		supabaseURL)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return fmt.Errorf("failed to connect to Supabase: %w", err)
	}

	// Test the connection
	ctx, cancel := context.WithTimeout(context.Background(), 5)
	defer cancel()

	if err := db.PingContext(ctx); err != nil {
		return fmt.Errorf("failed to ping Supabase: %w", err)
	}

	DB = db
	return nil
}

// CloseSupabase closes the database connection
func CloseSupabase() error {
	if DB != nil {
		return DB.Close()
	}
	return nil
}
