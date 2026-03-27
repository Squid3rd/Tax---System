package main

import (
	"log"
	"tax-calculator/config"
	"tax-calculator/models"
	"tax-calculator/routes"
)

func main() {

	config.ConnectDatabase()

	config.DB.AutoMigrate(&models.User{}, &models.TaxRecord{})
	log.Println("Database Migrated")

	r := routes.SetupRouter()
	log.Println("Server starting on :8080")
	r.Run(":8080")
}
