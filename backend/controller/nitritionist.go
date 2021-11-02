package controller

import (
	"net/http"

	"github.com/TerngPatapee/food/entity"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// GET /Nutritionist
// List all Nutritionist
func ListNutritionists(c *gin.Context) {
	var nutritionists []entity.Nutritionist
	if err := entity.DB().Raw("SELECT * FROM nutritionists").Scan(&nutritionists).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": nutritionists})
}

// GET /nutritionists/:id
// Get nutritionist by id
func GetNutritionist(c *gin.Context) {
	var nutritionist entity.Nutritionist
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM nutritionists WHERE id = ?", id).Scan(&nutritionist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": nutritionist})
}

// POST /nutritionists
func CreateNutritionist(c *gin.Context) {
	var nutritionist entity.Nutritionist
	if err := c.ShouldBindJSON(&nutritionist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	bytes, err := bcrypt.GenerateFromPassword([]byte(nutritionist.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}
	nutritionist.Password = string(bytes)

	if err := entity.DB().Create(&nutritionist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": nutritionist})
}

// PATCH /nutritionists
func UpdateNutritionist(c *gin.Context) {
	var nutritionist entity.Nutritionist
	if err := c.ShouldBindJSON(&nutritionist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", nutritionist.ID).First(&nutritionist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nutritionist not found"})
		return
	}

	if err := entity.DB().Save(&nutritionist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": nutritionist})
}

// DELETE /nutritionists/:id
func DeleteNutritionist(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM nutritionists WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nutritionist not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.Nutritionist{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}
