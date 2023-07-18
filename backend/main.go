package main

import (
	"log"

	"candle-backend/config"
	"candle-backend/models"
	"candle-backend/repository"
	"candle-backend/router"
)

func main() {
	db, err := config.ConnectDB()
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	// auto-migrate model book
	db.AutoMigrate(&models.Book{})
	if err != nil {
		log.Fatalf("failed to auto migrate: %v", err)
	}

	repo := repository.NewBookRepository(db)

	r := router.SetupRouter(repo)

	if err := r.Run(); err != nil {
		log.Fatalf("failed to start server: ")
	}
}