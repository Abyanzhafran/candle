package models

type Book struct {
	ID          string `json:"id" gorm:"primary_key"`
	Title       string `json:"title"`
	Author      string `json:"author"`
	Description string `json:"description"`
	PublishDate string `json:"publishdate"`
	Price       uint64 `json:"price"`
	ImageUrl    string `json:"imgurl"`
}
