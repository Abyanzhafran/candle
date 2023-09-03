package usecase

import (
	"errors"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
)

func handleError(ctx *gin.Context, message string, err error) {
	log.Printf("Error: %v", err)
	ctx.JSON(http.StatusBadRequest, gin.H{
		"status":  "error",
		"message": message,
		"error":   err.Error(),
	})
}

// this func handle upload and also validate the image
func HandleImageUpload(ctx *gin.Context) *multipart.FileHeader {
	file, err := ctx.FormFile("imagefile")

	if err != nil {
		handleError(ctx, "Failed to upload", err)
		return nil
	}

	if err := validateImage(file); err != nil {
		handleError(ctx, "Image validation failed", err)
		return nil
	}

	return file
}

func validateImage(file *multipart.FileHeader) error {
	// set file size limit for the image
	maxFileSize := int64(5 << 20) // 5 MB

	// validate max file size
	if file.Size > maxFileSize {
		return errors.New("file size limit exceeded")
	}

	// allowed file extension
	allowedExtension := []string{".png", ".jpeg", ".jpg"}
	ext := filepath.Ext(file.Filename)

	// check isValid
	isValid := false
	for _, data := range allowedExtension {
		// the default value is true
		if strings.Contains(ext, data) {
			isValid = true
			break
		}
	}

	if !isValid {
		return errors.New("prohibited file extension")
	}

	return nil
}

func DeleteImageByPath(ctx *gin.Context, imagePath string) {
	if err := os.Remove(imagePath); err != nil {
		handleError(ctx, "Error deleting image file from directory", err)
		return
	}
}

func SaveUploadedFile(ctx *gin.Context, file *multipart.FileHeader, uploadFolderPath string, newImageID string) string {
	// save image file - for developement version
	imagePathBase := filepath.Join(uploadFolderPath, newImageID+file.Filename)

	if err := ctx.SaveUploadedFile(file, imagePathBase); err != nil {
		handleError(ctx, "Can't save image to file storage", err)
		return ""
	}

	// save book url to database
	bookImageURL := "http://127.0.0.1:8081/" + newImageID + file.Filename

	return bookImageURL
}
