package controllers

import (
	"candle-backend/repository"
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

func (c *UserController) UserLogin(ctx *gin.Context) map[string]string {
	incomingUsername := ctx.Param("username")

	users, err := c.repo.Login(incomingUsername)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": err.Error(),
		})
		return nil
	}

	userData := *users
	res := map[string]string{
		userData.Username: userData.Password,
	}

	return res
}
