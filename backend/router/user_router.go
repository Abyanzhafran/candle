package router

import (
	"candle-backend/app"
	"candle-backend/controllers"
	"candle-backend/repository"

	"github.com/gin-gonic/gin"
)

func UserRouter(router *gin.Engine) {
	db := app.NewDB()

	userRepo := repository.NewUserRepository(db)
	UserCtrl := controllers.NewUserController(userRepo)

	UserRouter := router.Group("/user")
	{
		UserRouter.GET("/login", UserCtrl.UserLogin)
	}
}
