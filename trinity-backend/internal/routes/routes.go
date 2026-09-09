package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/johnman136/Trinity/trinity-backend/internal/handlers"
	"github.com/johnman136/Trinity/trinity-backend/internal/middleware"

	middleware "github.com/johnman136/Trinity/trinity-backend/internal/middleware"
)

func Register(r *gin.Engine) {
	r.GET("/health", handlers.Health)

	// Public routes (authentication)
	auth := r.Group("/auth")
	{
		auth.POST("/login", handlers.Login)
		auth.POST("/signup", handlers.Signup)
		auth.POST("/logout", handlers.Logout)
	}

	api := r.Group("/api", middleware.RequestLogger())
	{
		api.GET("/hello", handlers.Hello)
		api.POST("/echo", handlers.Echo)
	}

	// Protected routes (require JWT token)
	protected := r.Group("/api/protected", middleware.RequestLogger(), middleware.JWTAuth())
	{
		// Add protected endpoints here
		// Example: protected.GET("/user", handlers.GetUser)
	}
}
