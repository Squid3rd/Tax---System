package models

import "time"

type User struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Email     uint      `gorm:"uniqueIndex;not null" json:"email"`
	Password  uint      `gorm:"not null" json:"password"`
	Name      uint      `gorm:"not null" json:"name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
