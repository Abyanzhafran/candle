package controllers

import (
	"net/http"

	"candle-backend/models"
	"candle-backend/repository"

	"github.com/google/uuid"

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
			"status":  "error",
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"message": "Book fetched successfully",
		"data":    books,
	})
}

func (c *BookController) GetBookByID(ctx *gin.Context) {
	id := ctx.Param("id")
	book, err := c.repo.GetBookByID(id)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status":  "error",
			"message": "Book not found",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": "ok",
		"data":   book,
	})
}

func (c *BookController) AddBook(ctx *gin.Context) {
	var book models.Book
	/*
		use shouldBind is actually can handle json and form-data,
		depend on your models tags
	*/
	if err := ctx.ShouldBind(&book); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": err.Error(),
		})
		return
	}

	// generate uuid for the book
	id, err := uuid.NewRandom()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Error generating uuid",
		})
	}

	book.ID = id.String()
	if err := c.repo.AddBook(&book); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"message": "Book added",
	})
}

func (c *BookController) EditBook(ctx *gin.Context) {
	id := ctx.Param("id")

	book, err := c.repo.GetBookByID(id)

	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status":  "error",
			"message": "Id not found",
		})
		return
	}
	if err := ctx.ShouldBindJSON(&book); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": err.Error(),
		})
		return
	}
	if err := c.repo.EditBook(book); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"message": "Book updated",
	})
}

func (c *BookController) DeleteBook(ctx *gin.Context) {
	id := ctx.Param("id")
	if err := c.repo.DeleteBook(id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": err.Error(),
		})
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"message": "Book deleted",
	})
}
