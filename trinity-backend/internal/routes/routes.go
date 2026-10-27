package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/johnman136/Trinity/trinity-backend/internal/handlers"
	"github.com/johnman136/Trinity/trinity-backend/internal/middleware"
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

	protectedAPI := r.Group("/api", middleware.RequestLogger(), middleware.JWTAuth())
	{
		protectedAPI.POST("/bookings", handlers.CreateBooking)
		protectedAPI.GET("/bookings", handlers.ListUserBookings)
		protectedAPI.DELETE("/bookings/:id", handlers.DeleteUserBooking)
	}

	// Protected routes (require JWT token)
	protected := r.Group("/api/protected", middleware.RequestLogger(), middleware.JWTAuth())
	// Example protected endpoint to ensure the group variable is used
	protected.GET("/hello", handlers.Hello)

	roomBookings := r.Group("/api/room-bookings", middleware.RequestLogger(), middleware.JWTAuth())
	roomBookings.GET("/calendar", handlers.ListCalendarEvents)
	roomBookings.POST("", handlers.CreateRoomBooking)

	adminRoomBookings := r.Group(
		"/api/room-bookings",
		middleware.RequestLogger(),
		middleware.JWTAuth(),
		middleware.RequireRole("admin"),
	)
	adminRoomBookings.GET("", handlers.ListRoomBookings)
	adminRoomBookings.PATCH("/:id/status", handlers.UpdateRoomBookingStatus)

	r.GET("/api/weekend-mass", handlers.ListWeekendMass)

	weekendAdmin := r.Group(
		"/api/weekend-mass",
		middleware.JWTAuth(),
		middleware.RequireRole("admin"),
	)

	weekendAdmin.POST("", handlers.CreateWeekendMass)
	weekendAdmin.PUT("/:id", handlers.UpdateWeekendMass)
	weekendAdmin.DELETE("/:id", handlers.DeleteWeekendMass)

	r.GET("/api/weekday-mass", handlers.ListWeekdayMass)

	weekdayAdmin := r.Group(
		"/api/weekday-mass",
		middleware.JWTAuth(),
		middleware.RequireRole("admin"),
	)

	weekdayAdmin.POST("", handlers.CreateWeekdayMass)
	weekdayAdmin.PUT("/:id", handlers.UpdateWeekdayMass)
	weekdayAdmin.DELETE("/:id", handlers.DeleteWeekdayMass)

	r.GET("/api/special-mass", handlers.ListSpecialMass)

	specialAdmin := r.Group(
		"/api/special-mass",
		middleware.JWTAuth(),
		middleware.RequireRole("admin"),
	)

	specialAdmin.POST("", handlers.CreateSpecialMass)
	specialAdmin.PUT("/:id", handlers.UpdateSpecialMass)
	specialAdmin.DELETE("/:id", handlers.DeleteSpecialMass)
}
