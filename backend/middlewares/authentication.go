package middlewares

import (
	"candle-backend/repository"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware(userRepo *repository.UserRepository) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// get the data from frontend
		user, password, hasAuth := ctx.Request.BasicAuth()

		if !hasAuth {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"status":  "error",
				"message": "Unauthorized",
			})
			ctx.Abort()
			return
		}

		dbData, err := userRepo.GetUserByUsername(user)

		if err != nil {
			log.Println("Error get user data from database : ", err)
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"status":  "error",
				"message": "Unauthorized",
			})
		}

		if !checkPassword(password, *&dbData.Password) {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"status":  "error",
				"message": "Unauthorized",
			})
			ctx.Abort()
			return
		}

		// store authenticated user data in context
		ctx.Set("authenticated user", dbData)

		// continue to the next handler/middleware
		ctx.Next()
	}
}

func checkPassword(inputPassword, dbPassword string) bool {
	return inputPassword == dbPassword
}
