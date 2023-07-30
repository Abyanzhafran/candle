package controllers

import (
	"net/http"
	// "strconv"

	// "candle-backend/models"
	"candle-backend/models"
	"candle-backend/repository"

	"github.com/gin-gonic/gin"
)

type BookController struct {
	repo *repository.BookRepository
}

/*
	make new BookController instances based 
	on repository.BookRepository field
*/
func NewBookController(repo *repository.BookRepository) *BookController {
	/* the {repo} means, is creating a new BookController struct with the 
	   repo field set to the value of the repo parameter.
	*/
	return &BookController{repo}
}

func (c *BookController) FindAll(ctx *gin.Context) {
	books, err := c.repo.FindAll()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status": "error",
			"message": err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"status": "ok",
		"message": "Book fetched successfully",
		"data": books,
	})
}

func (c *BookController) AddBook(ctx *gin.Context) {
	var book models.Book
	if err := ctx.ShouldBindJSON(&book); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": "error",
			"message": err.Error(),
		})
		return
	}
	if err := c.repo.AddBook(&book); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status": "error",
			"message": err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"status": "ok",
		"message": "Book added",
	})
}