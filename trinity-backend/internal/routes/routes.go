package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/johnman136/Trinity/trinity-backend/internal/handlers"
	"github.com/johnman136/Trinity/trinity-backend/internal/middleware"
)

func Register(r *gin.Engine) {
	r.GET("/health", handlers.Health)

	api := r.Group("/api", middleware.RequestLogger())
	{
		api.GET("/hello", handlers.Hello)
		api.POST("/echo", handlers.Echo)
	}
}
