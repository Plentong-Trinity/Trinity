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

var specialDatePattern = regexp.MustCompile(`^\d{4}-\d{2}-\d{2}$`)
var specialTimePattern = regexp.MustCompile(`^([01][0-9]|2[0-3]):[0-5][0-9]$`)

func specialMassError(c *gin.Context, err error) {
	if errors.Is(err, sql.ErrNoRows) {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Special Mass not found.",
		})
		return
	}

	log.Printf("Special Mass database error: %v", err)

	c.JSON(http.StatusInternalServerError, gin.H{
		"error": "The database operation failed. Please try again.",
	})
}

func readSpecialInput(c *gin.Context) (models.SpecialMassInput, bool) {
	var input models.SpecialMassInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Check the title, languages (select at least one), date, time and remarks.",
		})
		return input, false
	}

	if !specialDatePattern.MatchString(input.MassDate) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Date must use YYYY-MM-DD, for example 2026-12-24.",
		})
		return input, false
	}

	if !specialTimePattern.MatchString(input.MassTime) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Time must use HH:MM, for example 17:30.",
		})
		return input, false
	}

	return input, true
}

func readSpecialID(c *gin.Context) (string, bool) {
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

func ListSpecialMass(c *gin.Context) {
	repo := repository.NewSpecialMassRepository()

	masses, err := repo.List(c.Request.Context())
	if err != nil {
		specialMassError(c, err)
		return
	}

	c.JSON(http.StatusOK, masses)
}

func CreateSpecialMass(c *gin.Context) {
	input, ok := readSpecialInput(c)
	if !ok {
		return
	}

	repo := repository.NewSpecialMassRepository()

	mass, err := repo.Create(c.Request.Context(), input)
	if err != nil {
		specialMassError(c, err)
		return
	}

	c.JSON(http.StatusCreated, mass)
}

func UpdateSpecialMass(c *gin.Context) {
	id, ok := readSpecialID(c)
	if !ok {
		return
	}

	input, ok := readSpecialInput(c)
	if !ok {
		return
	}

	repo := repository.NewSpecialMassRepository()

	mass, err := repo.Update(c.Request.Context(), id, input)
	if err != nil {
		specialMassError(c, err)
		return
	}

	c.JSON(http.StatusOK, mass)
}

func DeleteSpecialMass(c *gin.Context) {
	id, ok := readSpecialID(c)
	if !ok {
		return
	}

	repo := repository.NewSpecialMassRepository()

	if err := repo.Delete(c.Request.Context(), id); err != nil {
		specialMassError(c, err)
		return
	}

	c.Status(http.StatusNoContent)
}
