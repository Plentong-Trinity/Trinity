package handlers

import (
	"context"
	"database/sql"
	"errors"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/johnman136/Trinity/trinity-backend/internal/db"
	"github.com/johnman136/Trinity/trinity-backend/internal/repository"
)

func GetLatestBulletin(c *gin.Context) {
	if db.DB == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "Bulletin service unavailable"})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	bulletin, err := repository.NewBulletinRepository().GetLatest(ctx)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			c.JSON(http.StatusNotFound, gin.H{"error": "No bulletin found"})
			return
		}
		log.Printf("Failed to load latest bulletin: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load latest bulletin"})
		return
	}

	c.Data(http.StatusOK, "application/json; charset=utf-8", bulletin)
}

func ListBulletins(c *gin.Context) {
	if db.DB == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "Bulletin service unavailable"})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	bulletins, err := repository.NewBulletinRepository().ListLatest(ctx)
	if err != nil {
		log.Printf("Failed to load bulletins: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load bulletins"})
		return
	}

	c.JSON(http.StatusOK, bulletins)
}
