package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Health(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}

func Hello(c *gin.Context) {
	name := c.Query("name")
	if name == "" {
		name = "world"
	}
	c.JSON(http.StatusOK, gin.H{"message": "Hello " + name})
}

type EchoBody struct {
	Message string `json:"message" binding:"required"`
}

func Echo(c *gin.Context) {
	var body EchoBody
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"you_said": body.Message})
}
