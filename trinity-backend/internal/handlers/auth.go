package handlers

import (
	"context"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/johnman136/Trinity/trinity-backend/internal/models"
	"github.com/johnman136/Trinity/trinity-backend/internal/repository"
	"github.com/johnman136/Trinity/trinity-backend/internal/utils"
)

// Claims defines the JWT claims structure
type Claims struct {
	Email  string `json:"email"`
	UserID string `json:"user_id"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

// LoginRequest defines the login request structure
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

// SignupRequest defines the signup request structure
type SignupRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
	Name     string `json:"name" binding:"required"`
	Phone    string `json:"phone"`
}

// LoginResponse defines the login response structure
type LoginResponse struct {
	Token   string               `json:"token"`
	User    *models.UserResponse `json:"user"`
	Message string               `json:"message"`
}

// GetJWTSecret retrieves the JWT secret from environment variables
func GetJWTSecret() string {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		// For development - MUST change in production!
		secret = "your-super-secret-jwt-key-change-in-production"
	}
	return secret
}

// Login handles user login and returns a JWT token
func Login(c *gin.Context) {
	var loginReq LoginRequest

	// Bind and validate request
	if err := c.ShouldBindJSON(&loginReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password format",
		})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	// Get user from database
	userRepo := repository.NewUserRepository()
	user, err := userRepo.GetUserByEmail(ctx, loginReq.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	// Check if user is active
	if !user.IsActive {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "User account is inactive",
		})
		return
	}

	// Verify password
	if !utils.VerifyPassword(user.PasswordHash, loginReq.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	// Update last login time
	_ = userRepo.UpdateLastLogin(ctx, user.ID)

	// Create JWT claims
	claims := &Claims{
		Email:  user.Email,
		UserID: user.ID,
		Role:   string(user.Role),
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
			Subject:   user.ID,
		},
	}

	// Create and sign token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(GetJWTSecret()))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to generate token",
		})
		return
	}

	c.JSON(http.StatusOK, LoginResponse{
		Token:   tokenString,
		User:    user.ToUserResponse(),
		Message: "Login successful",
	})
}

// Signup handles user registration
func Signup(c *gin.Context) {
	var signupReq SignupRequest

	// Bind and validate request
	if err := c.ShouldBindJSON(&signupReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid signup data",
		})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	// Check if user already exists
	userRepo := repository.NewUserRepository()
	_, err := userRepo.GetUserByEmail(ctx, signupReq.Email)
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{
			"error": "Email already registered",
		})
		return
	}

	// Hash password
	hashedPassword, err := utils.HashPassword(signupReq.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to process password",
		})
		return
	}

	// Create user
	user, err := userRepo.CreateUser(ctx, signupReq.Email, hashedPassword, signupReq.Name, signupReq.Phone, models.RoleUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create user account",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "User registered successfully",
		"user":    user.ToUserResponse(),
	})
}

// Logout handles user logout (frontend should delete the token)
func Logout(c *gin.Context) {
	// In a token-based system, logout is handled on the client side
	// The client simply deletes the token from localStorage
	// Optionally, you can implement token blacklisting here
	c.JSON(http.StatusOK, gin.H{
		"message": "Logout successful",
	})
}

// ValidateToken validates a JWT token and returns the claims
func ValidateToken(tokenString string) (*Claims, error) {
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(GetJWTSecret()), nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, jwt.ErrSignatureInvalid
	}

	return claims, nil
}
