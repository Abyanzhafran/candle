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

	// main user router group
	userRouter := router.Group("/user")

	// normal-user
	normalUserRouter := userRouter.Group("/normal", middlewares.AuthMiddleware(userRepo, "normal"))
	normalUserRouter.GET("/login", UserCtrl.UserLogin)
	normalUserRouter.GET("", UserCtrl.GetAllUsers)
	normalUserRouter.GET("/:username", UserCtrl.GetUserByUsername)
}
