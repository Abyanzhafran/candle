package models

type Book struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Author      string `json:"author"`
	PublishDate string `json:"publishdate"`
	UploadCover string `json:"uploadcover"`
}