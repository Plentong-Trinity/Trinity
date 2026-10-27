package handlers

import (
	"context"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/johnman136/Trinity/trinity-backend/internal/repository"
	"github.com/johnman136/Trinity/trinity-backend/internal/utils"
)

type UpdateProfileNameRequest struct {
	Name string `json:"name" binding:"required,max=255"`
}

type ChangePasswordRequest struct {
	CurrentPassword string `json:"current_password" binding:"required,max=72"`
	NewPassword     string `json:"new_password" binding:"required,min=6,max=72"`
}

// UpdateProfileName updates the authenticated user's name.
func UpdateProfileName(c *gin.Context) {
	var request UpdateProfileNameRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Name is required and must be 255 characters or fewer"})
		return
	}

	name := strings.TrimSpace(request.Name)
	if name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Name cannot be empty"})
		return
	}

	userID := c.GetString("user_id")
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	userRepo := repository.NewUserRepository()
	if err := userRepo.UpdateName(ctx, userID, name); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile name"})
		return
	}

	user, err := userRepo.GetUserByID(ctx, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve updated profile"})
		return
	}

	token, err := createToken(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to refresh authentication token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Profile name updated",
		"token":   token,
		"user":    user.ToUserResponse(),
	})
}

// ChangePassword updates the authenticated user's password after verifying the current password.
func ChangePassword(c *gin.Context) {
	var request ChangePasswordRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Current password and a new password of at least 6 characters are required"})
		return
	}
	if len(request.CurrentPassword) > 72 || len(request.NewPassword) > 72 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Passwords must be no more than 72 bytes"})
		return
	}

	userID := c.GetString("user_id")
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	userRepo := repository.NewUserRepository()
	user, err := userRepo.GetUserByID(ctx, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve account"})
		return
	}

	if !utils.VerifyPassword(user.PasswordHash, request.CurrentPassword) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Current password is incorrect"})
		return
	}

	passwordHash, err := utils.HashPassword(request.NewPassword)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process new password"})
		return
	}

	if err := userRepo.ChangePassword(ctx, userID, passwordHash); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Password changed successfully"})
}
