package repository

import (
	"candle-backend/models"

	"gorm.io/gorm"
)

type BookRepository struct {
	db *gorm.DB
}

func NewBookRepository(db *gorm.DB) *BookRepository {
	return &BookRepository{db}
}

func (r *BookRepository) FindAll() ([]*models.Book, error) {
	var books []*models.Book
	// write ORM
	if err := r.db.Find(&books).Error; err != nil {
		return nil, err
	}
	return books, nil
}