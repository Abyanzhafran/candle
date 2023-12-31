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

func (r *BookRepository) GetBookByID(id string) (*models.Book, error) {
	var book models.Book
	if err := r.db.Where("id = ?", id).First(&book).Error; err != nil {
		return nil, err
	}
	return &book, nil
}

func (r *BookRepository) AddBook(book *models.Book) error {
	return r.db.Create(book).Error
}

func (r *BookRepository) EditBook(book *models.Book) error {
	return r.db.Save(book).Error
}

func (r *BookRepository) DeleteBook(id string) error {
	return r.db.Where("id = ?", id).Delete(&models.Book{}).Error
}
