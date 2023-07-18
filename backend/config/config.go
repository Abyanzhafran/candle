package config

import (
	"fmt"	

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type AppConfig struct {
	DB *DBConfig
}

type DBConfig struct {
	Username string
	Password string
	Host	 string
	Port	 int
	Name	 string
}

func ConnectDB() (*gorm.DB, error) {
	dbConfig := &DBConfig {
		Username: "root", 
		Password: "",
		Host: "localhost",
		Port: 3306,
		Name: "book_db",
	}

	connStr := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbConfig.Username, dbConfig.Password, dbConfig.Host, dbConfig.Port, dbConfig.Name)

	db, err := gorm.Open(mysql.Open(connStr), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	return db, nil
}