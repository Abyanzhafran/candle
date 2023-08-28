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
			log.Println("error log : ", err)
		}

		// log the data
		log.Println("log inUser : ", user)
		log.Println("log inPass : ", password)
		log.Println("log hasAuth : ", hasAuth)
		log.Println("log dbData : ", *&dbData.Username)

		if err != nil || !checkPassword(password, *&dbData.Password) {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"status":  "error",
				"message": "Unauthorized",
			})
			ctx.Abort()
			return
		}
	}
}

func checkPassword(inputPassword, dbPassword string) bool {
	return inputPassword == dbPassword
}
