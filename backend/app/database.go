package app

import (
	"candle-backend/models"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func NewDB() *gorm.DB {
	if err := godotenv.Load(); err != nil {
		log.Fatal(err)
	}

	Username := os.Getenv("DBUSERNAME")
	Password := os.Getenv("DBPASSWORD")
	Host := os.Getenv("DBHOST")
	Port := os.Getenv("DBPORT")
	Name := os.Getenv("DBNAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		Username, Password, Host, Port, Name)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	// auto-migrate model book
	db.AutoMigrate(&models.User{}, &models.Book{})
	if err != nil {
		log.Fatalf("failed to auto migrate: %v", err)
	}

	return db
}
