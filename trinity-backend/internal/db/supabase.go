package db

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"strings"
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
	connStr := strings.TrimSpace(os.Getenv("DATABASE_URL"))
	if connStr == "" {
		supabaseURL := strings.TrimSpace(os.Getenv("SUPABASE_URL"))
		supabasePgPassword := strings.TrimSpace(os.Getenv("SUPABASE_PG_PASSWORD"))
		supabasePgUser := strings.TrimSpace(os.Getenv("SUPABASE_PG_USER"))
		supabasePgDatabase := strings.TrimSpace(os.Getenv("SUPABASE_PG_DATABASE"))

		if supabaseURL == "" || supabasePgPassword == "" || supabasePgUser == "" || supabasePgDatabase == "" {
			return fmt.Errorf("missing Supabase database configuration")
		}

		host := strings.TrimPrefix(strings.TrimPrefix(supabaseURL, "https://"), "http://")
		host = strings.TrimSuffix(host, "/")
		host = strings.TrimPrefix(host, "db.")
		// if strings.Contains(host, ".supabase.co") {
		// 	host = strings.TrimSuffix(host, ".supabase.co")
		// 	host = "db." + host + ".supabase.co"
		// } else {
		// 	host = "db." + host + ".supabase.co"
		// }
		connStr = fmt.Sprintf("postgresql://%s:%s@%s/%s?sslmode=require",
			supabasePgUser,
			supabasePgPassword,
			host,
			supabasePgDatabase,
		)
	}

	if DB != nil {
		_ = DB.Close()
	}

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return fmt.Errorf("failed to open Supabase connection: %w", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := db.PingContext(ctx); err != nil {
		_ = db.Close()
		return fmt.Errorf("failed to ping Supabase: %w", err)
	}

	DB = db

	// type LoginRequest struct {
	// 	Email    string `json:"email" binding:"required,email"`
	// 	Password string `json:"password" binding:"required,min=6"`
	// }

	// var loginReq LoginRequest
	// userRepo := repository.NewUserRepository()
	// log.Printf("Attempting to retrieve user with email: %s", loginReq.Email)
	// user, err := userRepo.GetUserByEmail(ctx, loginReq.Email)
	// if err != nil {
	// 	return fmt.Errorf("failed to retrieve user: %w", err)
	// } else {
	// 	log.Printf("Successfully retrieved user: %+v", user)
	// }

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
