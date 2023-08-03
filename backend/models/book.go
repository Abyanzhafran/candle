package models

import "mime/multipart"

type Book struct {
	ID          string `json:"id" form:"id" gorm:"primary_key"`
	Title       string `json:"title" form:"title"`
	Author      string `json:"author" form:"author"`
	Description string `json:"description" form:"description"`
	PublishDate string `json:"publishdate" form:"publishdate"`
	ImageUrl    string `json:"imageurl" form:"imageurl"`
	Price       uint64 `json:"price" form:"price"`
	ImageFile 	*multipart.FileHeader `form:"imagefile" binding:"required" gorm:"-"`
}
