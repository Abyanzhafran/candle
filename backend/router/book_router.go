package router

import (
	"candle-backend/app"
	"candle-backend/controllers"
	"candle-backend/middlewares"
	"candle-backend/repository"

	"github.com/gin-gonic/gin"
)

func BookRouter(router *gin.Engine) {
	db := app.NewDB()

	userRepo := repository.NewUserRepository(db)
	bookRepo := repository.NewBookRepository(db)

	BookCtrl := controllers.NewBookController(bookRepo)

	// main book router group
	bookRouter := router.Group("/book")

	// normal-user
	normalBookRouter := bookRouter.Group("/normal", middlewares.AuthMiddleware(userRepo, "normal"))
	normalBookRouter.GET("/:id", BookCtrl.GetBookByID)
	normalBookRouter.GET("", BookCtrl.FindAll)

	// admin-user
	adminBookRouter := bookRouter.Group("/admin", middlewares.AuthMiddleware(userRepo, "admin"))
	adminBookRouter.POST("", BookCtrl.AddBook)
	adminBookRouter.PUT("/:id", BookCtrl.EditBook)
	adminBookRouter.DELETE("/:id", BookCtrl.DeleteBook)
}
