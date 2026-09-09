package db

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"time"

	_ "github.com/lib/pq"
)

// Supabase connection pool
var DB *sql.DB

// When present, use the service role key instead of a direct Postgres connection
var SupabaseServiceRoleKey string
var SupabaseURL string

// InitSupabase initializes the Supabase database connection
func InitSupabase() error {
	// Get Supabase connection string from environment
	supabaseURL := os.Getenv("SUPABASE_URL")
	supabasePgPassword := os.Getenv("SUPABASE_PG_PASSWORD")
	supabasePgUser := os.Getenv("SUPABASE_PG_USER")
	supabasePgDatabase := os.Getenv("SUPABASE_PG_DATABASE")
	serviceRole := os.Getenv("SUPABASE_SERVICE_ROLE_KEY")

	// If a Supabase Service Role key is provided, prefer that and skip direct DB connection.
	if serviceRole != "" && supabaseURL != "" {
		SupabaseServiceRoleKey = serviceRole
		SupabaseURL = supabaseURL
		// Do not attempt a Postgres connection; caller can use the service role key.
		return nil
	}

	if supabaseURL == "" || supabasePgPassword == "" || supabasePgUser == "" || supabasePgDatabase == "" {
		return fmt.Errorf("missing Supabase environment variables")
	}
	// Build Postgres connection string using configured database
	// supabaseURL may be the full project url (https://xxxxx.supabase.co)
	// strip scheme if present when building host portion
	host := supabaseURL
	if len(host) > 8 && host[:8] == "https://" {
		host = host[8:]
	} else if len(host) > 7 && host[:7] == "http://" {
		host = host[7:]
	}

	connStr := fmt.Sprintf("postgres://%s:%s@db.%s/%s?sslmode=require",
		supabasePgUser,
		supabasePgPassword,
		host,
		supabasePgDatabase)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return fmt.Errorf("failed to connect to Supabase: %w", err)
	}

	// Test the connection
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
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
	// nothing to close when using service role key
	return nil
}
