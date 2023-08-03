package router

import (
	"candle-backend/controllers"
	"candle-backend/repository"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter(repo *repository.BookRepository) *gin.Engine {
	router := gin.Default()

	// Create a new CORS config
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"}                                       // You can set specific origins here instead of "*"
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"} // Specify the allowed HTTP methods
	config.AllowHeaders = []string{"Origin", "Content-Type"}                  // Specify the allowed headers

	// Use the CORS middleware with the provided config
	router.Use(cors.New(config))

	BookCtrl := controllers.NewBookController(repo)

	router.GET("/books", BookCtrl.FindAll)
	router.GET("/books/:id", BookCtrl.GetBookByID)
	router.POST("/books", BookCtrl.AddBook)
	router.PUT("/books/:id", BookCtrl.EditBook)
	router.DELETE("/books/:id", BookCtrl.DeleteBook)

	return router
}
