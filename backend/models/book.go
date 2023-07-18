package models

type Book struct {
	ID 				int		`json:"id"` 
	Title			string	`json:"title"`
	Author			string	`json:"author"`
	PublishDate		string	`json:"publishdate"`
	Desc			string	`json:"desc"`
	UploadCover		string	`json:"uploadcover"`
}