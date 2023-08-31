package controllers

import (
	"candle-backend/repository"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	repo *repository.UserRepository
}

func NewUserController(repo *repository.UserRepository) *UserController {
	return &UserController{repo}
}

func (c *UserController) GetAllUsers(ctx *gin.Context) {
	users, err := c.repo.GetAllUsers()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"message": "Book fetched successfully",
		"data":    users,
	})
}

func (c *UserController) GetUserByUsername(ctx *gin.Context) {
	incomingUsername := ctx.Param("username")

	user, err := c.repo.GetUserByUsername(incomingUsername)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status":  "error",
			"message": "User not found",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": "ok",
		"data":   user,
	})
}

func (c *UserController) UserLogin(ctx *gin.Context) {
	incomingUsername := ctx.Query("username")
	incomingPassword := ctx.Query("password")

	if incomingUsername == "" || incomingPassword == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"status":  "error",
			"message": "Username or password can't be null",
		})
		ctx.Abort()
		return
	}

	dbData, err := c.repo.GetUserByUsername(incomingUsername)

	if err != nil {
		log.Println("Error get user data from database : ", err)
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"status":  "error",
			"message": "Username not found",
		})
		ctx.Abort()
		return
	}

	if !checkPassword(incomingPassword, *&dbData.Password) {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"status":  "error",
			"message": "Unauthorized",
		})
		ctx.Abort()
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"message": "Login succesfully",
	})
}

// for support UserLogin func
func checkPassword(inputPassword, dbPassword string) bool {
	return inputPassword == dbPassword
}
