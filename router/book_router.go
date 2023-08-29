package router

import (
	"candle-backend/app"
	"candle-backend/controllers"
	"candle-backend/repository"

	"github.com/gin-gonic/gin"
)

func BookRouter(router *gin.Engine) {
	db := app.NewDB()

	bookRepo := repository.NewBookRepository(db)

	BookCtrl := controllers.NewBookController(bookRepo)

	router.GET("/books", BookCtrl.FindAll)
	router.GET("/books/:id", BookCtrl.GetBookByID)
	router.POST("/books", BookCtrl.AddBook)
	router.PUT("/books/:id", BookCtrl.EditBook)
	router.DELETE("/books/:id", BookCtrl.DeleteBook)
}
