package handlers

import (
	"net/http"

	"tax-calculator/config"
	"tax-calculator/models"
	"tax-calculator/services"

	"github.com/gin-gonic/gin"
)

type CalculateInput struct {
	GrossIncome float64 `json:"gross_income" binding:"required,gt=0"`
	Year        int     `json:"year" binding:"required"`
	Country     string  `json:"country" binding:"required"`
}

func CalculateTax(c *gin.Context) {
	var input CalculateInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID, _ := c.Get("user_id")

	var result services.TaxResult
	switch input.Country {
	case "TH":
		result = services.CalculateThaiTax(input.GrossIncome)
	default:
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unsupported Coountry"})
		return
	}

	record := models.TaxRecord{
		UserID:            userID.(uint),
		Country:           input.Country,
		GrossIncome:       result.GrossIncome,
		ExpenseDeduction:  result.ExpenseDeduction,
		PersonalAllowance: result.PersonalAllowance,
		NetIncome:         result.NetIncome,
		TaxAmount:         result.TaxAmount,
		EffectiveRate:     result.EffectiveRate,
		Year:              input.Year,
	}

	if err := config.DB.Create(&record).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "falied to save record"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"result": result,
		"record": record,
	})

}

func GetTaxHistory(c *gin.Context) {
	userID, _ := c.Get("user_id")

	var records []models.TaxRecord
	config.DB.Where("user_id = ?", userID).Order("created_at desc").Find(&records)

	c.JSON(http.StatusOK, gin.H{"records": records})
}
