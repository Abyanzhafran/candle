package router

import (
	"candle-backend/app"
	"candle-backend/controllers"
	"candle-backend/middlewares"
	"candle-backend/repository"

	"github.com/gin-gonic/gin"
)

func UserRouter(router *gin.Engine) {
	db := app.NewDB()

	userRepo := repository.NewUserRepository(db)
	UserCtrl := controllers.NewUserController(userRepo)

	UserRouter := router.Group("/admin", middlewares.AuthMiddleware(userRepo))

	UserRouter.GET("/users", UserCtrl.GetAllUsers)
}
