package controllers

import (
	"net/http"
	"os"
	"path/filepath"

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
			"message": "Check your input data",
			"error": err.Error(),
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

	// handling upload image
	file, err := ctx.FormFile("imagefile")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": "error",
			"message": "failed uploading the image",
		})
		return
	}
	
	// make uploaded_image folder if it's doesn't exist
	uploadsFolder := "../uploaded_image"
	if _, err := os.Stat(uploadsFolder); os.IsNotExist(err) {
		err := os.Mkdir(uploadsFolder, 0755)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"status": "error",
				"message": "Failed to create folder for saving image",
			})
		}
	}

	// save image file 
	imagePath := filepath.Join(uploadsFolder, filepath.Ext(file.Filename))
	if err := ctx.SaveUploadedFile(file, imagePath); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status": "error",
			"message": "Upload image error",
			"error": err.Error(),
		})
		return
	}

	// fill the book struct(models) with uuid
	book.ID = id.String()

	// fill the imageUrl struct(models) with the imageUrl value
	/*
		you can add you domain like this if you want
		book.ImageUrl = "http://your-domain.com/" + imagePath
	*/
	book.ImageUrl = imagePath
	
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
