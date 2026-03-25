package models

import "time"

type TaxRecord struct {
	ID                uint      `gorm:"primaryKey" json:"id"`
	UserID            uint      `gorm:"primaryKey" json:"user_id"`
	Country           string    `gorm:"primaryKey" json:"country"`
	GrossIncome       float64   `gorm:"primaryKey" json:"gross_income"`
	ExpenseDeduction  float64   `gorm:"primaryKey" json:"expense_deduction"`
	PersonalAllowance float64   `gorm:"primaryKey" json:"personal_allowance"`
	NetIncome         float64   `gorm:"primaryKey" json:"net_income"`
	TexAmount         float64   `gorm:"primaryKey" json:"tex_amount"`
	EffectiveRate     float64   `gorm:"primaryKey" json:"effective_rate"`
	Year              int       `gorm:"primaryKey" json:"year"`
	CreatedAt         time.Time `gorm:"primaryKey" json:"created_at"`
}
