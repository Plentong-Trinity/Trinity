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

var weekendTimePattern = regexp.MustCompile(
	`^([01][0-9]|2[0-3]):[0-5][0-9]$`,
)

func weekendMassError(c *gin.Context, err error) {
	if errors.Is(err, sql.ErrNoRows) {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Weekend Mass not found.",
		})
		return
	}

	log.Printf("Weekend Mass database error: %v", err)

	c.JSON(http.StatusInternalServerError, gin.H{
		"error": "The database operation failed. Please try again.",
	})
}

func readWeekendInput(
	c *gin.Context,
) (models.WeekendMassInput, bool) {
	var input models.WeekendMassInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Check the language (select exactly one), day (exactly one Saturday or Sunday), time and remarks.",
		})
		return input, false
	}

	if !weekendTimePattern.MatchString(input.MassTime) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Time must use HH:MM, for example 17:30.",
		})
		return input, false
	}

	return input, true
}

func readWeekendID(c *gin.Context) (string, bool) {
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

func ListWeekendMass(c *gin.Context) {
	repo := repository.NewWeekendMassRepository()

	masses, err := repo.List(c.Request.Context())
	if err != nil {
		weekendMassError(c, err)
		return
	}

	c.JSON(http.StatusOK, masses)
}

func CreateWeekendMass(c *gin.Context) {
	input, ok := readWeekendInput(c)
	if !ok {
		return
	}

	repo := repository.NewWeekendMassRepository()

	mass, err := repo.Create(c.Request.Context(), input)
	if err != nil {
		weekendMassError(c, err)
		return
	}

	c.JSON(http.StatusCreated, mass)
}

func UpdateWeekendMass(c *gin.Context) {
	id, ok := readWeekendID(c)
	if !ok {
		return
	}

	input, ok := readWeekendInput(c)
	if !ok {
		return
	}

	repo := repository.NewWeekendMassRepository()

	mass, err := repo.Update(c.Request.Context(), id, input)
	if err != nil {
		weekendMassError(c, err)
		return
	}

	c.JSON(http.StatusOK, mass)
}

func DeleteWeekendMass(c *gin.Context) {
	id, ok := readWeekendID(c)
	if !ok {
		return
	}

	repo := repository.NewWeekendMassRepository()

	if err := repo.Delete(c.Request.Context(), id); err != nil {
		weekendMassError(c, err)
		return
	}

	c.Status(http.StatusNoContent)
}
