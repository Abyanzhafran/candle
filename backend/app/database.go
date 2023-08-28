package app

import (
	"candle-backend/models"
	"fmt"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func NewDB() *gorm.DB {
	Username := "root"
	Password := ""
	Host := "localhost"
	Port := 3306
	Name := "book_db"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
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
