package controllers

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"candle-backend/models"
	"candle-backend/repository"

	"github.com/google/uuid"

	"github.com/gin-gonic/gin"
)

type BookController struct {
	repo *repository.BookRepository
}

// make new BookController instances based
// on repository.BookRepository field
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
	// use shouldBind is actually can handle json and form-data,
	// depend on your models tags
	if err := ctx.ShouldBind(&book); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Check your input data",
			"error":   err.Error(),
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
			"status":  "error",
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
				"status":  "error",
				"message": "Failed to create folder for saving image",
			})
		}
	}

	// saving  - for production version
	// savePath := filepath.Join(uploadsFolder, file.Filename)
	// if err := ctx.SaveUploadedFile(file, filename); err != nil {
	// 	ctx.JSON(http.StatusInternalServerError, gin.H{
	// 		"status":  "error",
	// 		"message": "Upload image error",
	// 		"error":   err.Error(),
	// 	})
	// 	return
	// }

	// get absolute path - for production version
	// imageAbsPath, err := filepath.Abs(filename)
	// if err != nil {
	// 	ctx.JSON(http.StatusInternalServerError, gin.H{
	// 		"status":  "error",
	// 		"message": "Failed to get filepath",
	// 	})
	// }

	// save image file - for developement version
	imagePathBase := filepath.Join(uploadsFolder, file.Filename)

	if err := ctx.SaveUploadedFile(file, imagePathBase); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Upload image error",
			"error":   err.Error(),
		})
		return
	}

	// fill the book struct(models) with uuid
	book.ID = id.String()

	// fill the imageUrl struct(models) with the imageUrl value
	// you can add you domain like this if you want
	// book.ImageUrl = "http://your-domain.com/" + imagePath
	// you can change this line for dev mode or prod mode
	imageId, _ := uuid.NewRandom()
	book.ImageUrl = "http://127.0.0.1:8081/" + imageId.String() + file.Filename

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

	_, err := c.repo.GetBookByID(id)

	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"status":  "error",
			"message": "Id not found",
		})
		return
	}

	logVal := ctx.PostForm("imageurl")
	log.Println("logging : ", logVal)
	// // NEW TASK :
	// // Checking if the image the same or not
	// // if the same, it means the user not updating the imaeg
	// // but if the image different, it means the user updating the image

	// // TASK ANSWER :
	// // to diffrentiate the image just check if file(image) nil or not
	// // if file != nil, users updated file image
	// // vice versa

	// file, _ := ctx.FormFile("imagefile")

	// if file != nil {
	// 	// replacing the domain
	// 	// to check the image file in you directory
	// 	replaceDomainPath := strings.Replace(book.ImageUrl, "http://127.0.0.1:8081", "../uploaded_image", 1)

	// 	// check if the associated image can delete or not
	// 	if err := os.Remove(replaceDomainPath); err != nil {
	// 		ctx.JSON(http.StatusInternalServerError, gin.H{
	// 			"status":  "error",
	// 			"message": "Error deleting image file from directory",
	// 			"error":   err.Error(),
	// 		})
	// 	}

	// 	// handling upload image
	// 	file, err := ctx.FormFile("imagefile")
	// 	if err != nil {
	// 		ctx.JSON(http.StatusBadRequest, gin.H{
	// 			"status":  "error",
	// 			"message": "failed uploading the image",
	// 		})
	// 		return
	// 	}

	// 	// make uploaded_image folder if it's doesn't exist
	// 	uploadsFolder := "../uploaded_image"

	// 	// save image file - for developement version
	// 	imagePathBase := filepath.Join(uploadsFolder, file.Filename)

	// 	if err := ctx.SaveUploadedFile(file, imagePathBase); err != nil {
	// 		ctx.JSON(http.StatusInternalServerError, gin.H{
	// 			"status":  "error",
	// 			"message": "Upload image error",
	// 			"error":   err.Error(),
	// 		})
	// 		return
	// 	}

	// 	// fill the imageUrl struct(models) with the imageUrl value
	// 	// you can add you domain like this if you want
	// 	// book.ImageUrl = "http://your-domain.com/" + imagePath
	// 	// you can change this line for dev mode or prod mode
	// 	imageId, _ := uuid.NewRandom()
	// 	book.ImageUrl = "http://127.0.0.1:8081/" + imageId.String() + file.Filename
	// }

	// //
	// book.ImageUrl =

	// if err := ctx.ShouldBind(&book); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{
	// 		"status":  "error",
	// 		"message": err.Error(),
	// 	})
	// 	return
	// }

	// if err := c.repo.EditBook(book); err != nil {
	// 	ctx.JSON(http.StatusInternalServerError, gin.H{
	// 		"status":  "error",
	// 		"message": err.Error(),
	// 	})
	// 	return
	// }

	// ctx.JSON(http.StatusOK, gin.H{
	// 	"status":  "ok",
	// 	"message": "Book updated",
	// })
}

func (c *BookController) DeleteBook(ctx *gin.Context) {
	id := ctx.Param("id")

	book, err := c.repo.GetBookByID(id)

	// delete the associated image file
	if id != "" {
		// check if is there any error for getting the book by id
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"status":  "error",
				"message": "Can't get the book, there's some error",
				"error":   err.Error(),
			})
		}

		// in production mode
		// change the local domain, with the production domain
		// this things : http://127.0.0.1:8081
		replaceDomainPath := strings.Replace(book.ImageUrl, "http://127.0.0.1:8081", "../uploaded_image", 1)

		err := os.Remove(replaceDomainPath)

		// Check if the associated image can delete or not
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"status":  "error",
				"message": "Error deleting image file from directory",
				"error":   err.Error(),
			})
		}
	}

	// delete the book from database
	// not including the image file
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
