package models

import "mime/multipart"

type Book struct {
	ID          string                `json:"id" form:"id" gorm:"primary_key"`
	Title       string                `json:"title" form:"title" gorm:"type:varchar(100)"`
	Author      string                `json:"author" form:"author" gorm:"type:varchar(100)"`
	Description string                `json:"description" form:"description"`
	PublishDate string                `json:"publishdate" form:"publishdate" gorm:"type:varchar(10)"`
	ImageUrl    string                `json:"imageurl" form:"imageurl"`
	Price       uint64                `json:"price" form:"price"`
	ImageFile   *multipart.FileHeader `form:"imagefile" gorm:"-"`
}
