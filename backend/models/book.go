package models

type Book struct {
	ID          string `json:"id" gorm:"primary_key"`
	Title       string `json:"title"`
	Author      string `json:"author"`
	Description string `json:"description"`
	PublishDate string `json:"publishdate"`
	ImageUrl    string `json:"imageurl"`
	Price       uint64 `json:"price"`
}
