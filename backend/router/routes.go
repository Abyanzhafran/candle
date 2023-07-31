package router

import (
	"candle-backend/controllers"
	"candle-backend/repository"

	"github.com/gin-gonic/gin"
)

func SetupRouter(repo *repository.BookRepository) *gin.Engine {
	router := gin.Default()

	BookCtrl := controllers.NewBookController(repo)

	router.GET("/books", BookCtrl.FindAll)
	router.GET("/books/:id", BookCtrl.GetBookByID)
	router.POST("/books", BookCtrl.AddBook)
	router.PUT("/books/:id", BookCtrl.EditBook)

	return router
}
