package handlers

import (
	"database/sql"
	"errors"
	"log"
	"net/http"
	"regexp"

	"github.com/gin-gonic/gin"
	"github.com/johnman136/Trinity/trinity-backend/internal/models"
	"github.com/johnman136/Trinity/trinity-backend/internal/repository"
)

var weekdayTimePattern = regexp.MustCompile(
	`^([01][0-9]|2[0-3]):[0-5][0-9]$`,
)

func weekdayMassError(c *gin.Context, err error) {
	if errors.Is(err, sql.ErrNoRows) {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Weekday Mass not found.",
		})
		return
	}

	log.Printf("Weekday Mass database error: %v", err)

	c.JSON(http.StatusInternalServerError, gin.H{
		"error": "The database operation failed. Please try again.",
	})
}

func readWeekdayInput(
	c *gin.Context,
) (models.WeekdayMassInput, bool) {
	var input models.WeekdayMassInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Check the language (select exactly one), days (select at least one from Monday to Friday), time and remarks.",
		})
		return input, false
	}

	// Keep selected days in calendar order regardless of selection order.
	days := make([]string, 0, len(input.DaysOfWeek))
	for _, day := range []string{"Monday", "Tuesday", "Wednesday", "Thursday", "Friday"} {
		for _, selected := range input.DaysOfWeek {
			if selected == day {
				days = append(days, day)
			}
		}
	}
	input.DaysOfWeek = days

	if !weekdayTimePattern.MatchString(input.MassTime) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Time must use HH:MM, for example 17:30.",
		})
		return input, false
	}

	return input, true
}

func readWeekdayID(c *gin.Context) (string, bool) {
	var params struct {
		ID string `uri:"id" binding:"required,uuid"`
	}

	if err := c.ShouldBindUri(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid Mass ID.",
		})
		return "", false
	}

	return params.ID, true
}

func ListWeekdayMass(c *gin.Context) {
	repo := repository.NewWeekdayMassRepository()

	masses, err := repo.List(c.Request.Context())
	if err != nil {
		weekdayMassError(c, err)
		return
	}

	c.JSON(http.StatusOK, masses)
}

func CreateWeekdayMass(c *gin.Context) {
	input, ok := readWeekdayInput(c)
	if !ok {
		return
	}

	repo := repository.NewWeekdayMassRepository()

	mass, err := repo.Create(c.Request.Context(), input)
	if err != nil {
		weekdayMassError(c, err)
		return
	}

	c.JSON(http.StatusCreated, mass)
}

func UpdateWeekdayMass(c *gin.Context) {
	id, ok := readWeekdayID(c)
	if !ok {
		return
	}

	input, ok := readWeekdayInput(c)
	if !ok {
		return
	}

	repo := repository.NewWeekdayMassRepository()

	mass, err := repo.Update(c.Request.Context(), id, input)
	if err != nil {
		weekdayMassError(c, err)
		return
	}

	c.JSON(http.StatusOK, mass)
}

func DeleteWeekdayMass(c *gin.Context) {
	id, ok := readWeekdayID(c)
	if !ok {
		return
	}

	repo := repository.NewWeekdayMassRepository()

	if err := repo.Delete(c.Request.Context(), id); err != nil {
		weekdayMassError(c, err)
		return
	}

	c.Status(http.StatusNoContent)
}
