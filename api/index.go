package api

import (
	"net/http"

	"candle-backend/router"

	"github.com/gin-gonic/gin"
)

var (
	app *gin.Engine
)

// cors custom function
// use this, instead of use gin's cors function
// there still a bug at there
func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func init() {
	app = gin.New()

	app.Use(CORS())

	router.UserRouter(app)
	router.BookRouter(app)
}

// entry point
func Handler(w http.ResponseWriter, r *http.Request) {
	app.ServeHTTP(w, r)
}
