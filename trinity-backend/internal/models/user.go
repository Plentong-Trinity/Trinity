package models

import (
	"database/sql/driver"
	"encoding/json"
	"time"
)

// UserRole represents the user's role in the system
type UserRole string

const (
	RoleUser  UserRole = "user"
	RoleAdmin UserRole = "admin"
	RoleStaff UserRole = "staff"
)

// User represents a user in the system
type User struct {
	ID           string     `json:"id"`
	Email        string     `json:"email"`
	PasswordHash string     `json:"-"` // Never expose password hash
	Name         string     `json:"name"`
	Phone        string     `json:"phone,omitempty"`
	Role         UserRole   `json:"role"`
	IsActive     bool       `json:"is_active"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
	LastLoginAt  *time.Time `json:"last_login_at,omitempty"`
}

// Scan implements sql.Scanner interface for database reading
func (u *User) Scan(value interface{}) error {
	bytes, ok := value.([]byte)
	if !ok {
		return nil
	}
	return json.Unmarshal(bytes, &u)
}

// Value implements driver.Valuer interface for database writing
func (u User) Value() (driver.Value, error) {
	return json.Marshal(u)
}

// UserResponse is the response sent to clients (without password)
type UserResponse struct {
	ID          string     `json:"id"`
	Email       string     `json:"email"`
	Name        string     `json:"name"`
	Phone       string     `json:"phone,omitempty"`
	Role        UserRole   `json:"role"`
	IsActive    bool       `json:"is_active"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
	LastLoginAt *time.Time `json:"last_login_at,omitempty"`
}

// ToUserResponse converts User to UserResponse (safe for client)
func (u *User) ToUserResponse() *UserResponse {
	return &UserResponse{
		ID:          u.ID,
		Email:       u.Email,
		Name:        u.Name,
		Phone:       u.Phone,
		Role:        u.Role,
		IsActive:    u.IsActive,
		CreatedAt:   u.CreatedAt,
		UpdatedAt:   u.UpdatedAt,
		LastLoginAt: u.LastLoginAt,
	}
}
