package models

type User struct {
	ID       string `json:"id" form:"id" gorm:"primary_key"`
	Username string `json:"username" form:"username" gorm:"type:varchar(20)"`
	Password string `json:"password" form:"password" gorm:"type:varchar(20)"`
}
