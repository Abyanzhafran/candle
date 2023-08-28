package router

import (
	"candle-backend/app"
	"candle-backend/controllers"
	"candle-backend/repository"

	"github.com/gin-gonic/gin"
)

func BookRouter(router *gin.Engine) {
	db := app.NewDB()

	repo := repository.NewBookRepository(db)
	BookCtrl := controllers.NewBookController(repo)

	bookRouter := router.Group("/admin", gin.BasicAuth(gin.Accounts{
		"foo":    "bar",
		"austin": "1234",
		"lena":   "hello2",
		"manu":   "4321",
	}))

	bookRouter.GET("/books", BookCtrl.FindAll)
	bookRouter.GET("/:id", BookCtrl.GetBookByID)
	bookRouter.POST("", BookCtrl.AddBook)
	bookRouter.PUT("/:id", BookCtrl.EditBook)
	bookRouter.DELETE("/:id", BookCtrl.DeleteBook)
}
