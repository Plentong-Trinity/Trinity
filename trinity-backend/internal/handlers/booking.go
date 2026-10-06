package handlers

import (
	"context"
	"errors"
	"net/http"
	"regexp"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/johnman136/Trinity/trinity-backend/internal/db"
	"github.com/lib/pq"
)

// BookingRequest contains the payload used to create a booking row.
// It accepts the expected field names and also tolerates the common typo "depratment"
// and "strat_on" to keep client integrations flexible.
type BookingRequest struct {
	Name        string    `json:"name" binding:"required"`
	Phone       string    `json:"phone" binding:"required"`
	Pax         int       `json:"pax" binding:"required"`
	Room        []string  `json:"room" binding:"required"`
	Department  string    `json:"department"`
	Depratment  string    `json:"depratment,omitempty"`
	Description string    `json:"description" binding:"required"`
	StartOn     time.Time `json:"start_on"`
	StratOn     time.Time `json:"strat_on,omitempty"`
	EndOn       time.Time `json:"end_on" binding:"required"`
}

func (r *BookingRequest) normalize() {
	if strings.TrimSpace(r.Department) == "" {
		r.Department = strings.TrimSpace(r.Depratment)
	}

	if r.StartOn.IsZero() && !r.StratOn.IsZero() {
		r.StartOn = r.StratOn
	}

}

func (r *BookingRequest) validate() error {
	if strings.TrimSpace(r.Name) == "" {
		return errors.New("name is required")
	}
	if strings.TrimSpace(r.Phone) == "" {
		return errors.New("phone is required")
	}
	phoneRegex := regexp.MustCompile(`^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.\/0-9]*$`)
	if !phoneRegex.MatchString(strings.TrimSpace(r.Phone)) {
		return errors.New("phone number is invalid")
	}
	if r.Pax <= 0 {
		return errors.New("pax must be greater than 0")
	}
	if len(r.Room) == 0 {
		return errors.New("room is required")
	}
	for _, room := range r.Room {
		if strings.TrimSpace(room) == "" {
			return errors.New("room values cannot be empty")
		}
	}
	if strings.TrimSpace(r.Department) == "" {
		return errors.New("department is required")
	}
	if strings.TrimSpace(r.Description) == "" {
		return errors.New("description is required")
	}
	if r.StartOn.IsZero() {
		return errors.New("start_on is required")
	}
	if r.EndOn.IsZero() {
		return errors.New("end_on is required")
	}
	if r.EndOn.Before(r.StartOn) {
		return errors.New("end_on must be after start_on")
	}
	return nil
}

// CreateBooking inserts a booking request into the Booking table.
func CreateBooking(c *gin.Context) {

	var payload BookingRequest
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	payload.normalize()
	if err := payload.validate(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if db.DB == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "database is not initialized"})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required to create a booking"})
		return
	}

	userIDStr, ok := userID.(string)
	if !ok || strings.TrimSpace(userIDStr) == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Valid user session required to create a booking"})
		return
	}

	query := `
		INSERT INTO "Booking" (user_id, name, phone, pax, room, department, description, start_on, end_on)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
		RETURNING id
	`

	var bookingID string
	if err := db.DB.QueryRowContext(
		ctx,
		query,
		userIDStr,
		strings.TrimSpace(payload.Name),
		strings.TrimSpace(payload.Phone),
		payload.Pax,
		pq.Array(payload.Room),
		strings.TrimSpace(payload.Department),
		strings.TrimSpace(payload.Description),
		payload.StartOn.UTC(),
		payload.EndOn.UTC(),
	).Scan(&bookingID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create booking: " + err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":    "Booking created successfully",
		"booking_id": bookingID,
		"data": gin.H{
			"name":        strings.TrimSpace(payload.Name),
			"phone":       strings.TrimSpace(payload.Phone),
			"pax":         payload.Pax,
			"room":        payload.Room,
			"department":  strings.TrimSpace(payload.Department),
			"description": strings.TrimSpace(payload.Description),
			"start_on":    payload.StartOn.UTC(),
			"end_on":      payload.EndOn.UTC(),
		},
	})
}
