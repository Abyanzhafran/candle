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

	bookRouter := router.Group("/admin", middlewares.AuthMiddleware(userRepo))

	bookRouter.GET("/books", BookCtrl.FindAll)
	// without authorization
	router.GET("/:id", BookCtrl.GetBookByID)

	// with authorization
	bookRouter.POST("", BookCtrl.AddBook)
	bookRouter.PUT("/:id", BookCtrl.EditBook)
	bookRouter.DELETE("/:id", BookCtrl.DeleteBook)
}
