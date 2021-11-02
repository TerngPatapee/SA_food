package main

import (
	"github.com/TerngPatapee/food/controller"
	"github.com/TerngPatapee/food/entity"
	"github.com/TerngPatapee/food/middlewares"
	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// nutritionist Routes
			protected.GET("/nutritionists", controller.ListNutritionists)
			protected.GET("/nutritionist/:id", controller.GetNutritionist)
			protected.PATCH("/nutritionists", controller.UpdateNutritionist)
			protected.DELETE("/nutritionists/:id", controller.DeleteNutritionist)

			// treatmentrecord Routes
			protected.GET("/treatmentrecords", controller.ListTreatmentRecords)
			protected.GET("/treatmentrecord/:id", controller.GetTreatmentRecord)
			protected.POST("/treatmentrecord", controller.CreateTreatmentRecord)
			protected.PATCH("/vtreatmentrecords", controller.UpdateTreatmentRecord)
			protected.DELETE("/treatmentrecords/:id", controller.DeleteTreatmentRecord)

			// foodset Routes
			protected.GET("/foodsets", controller.ListFoodSets)
			protected.GET("/foodset/:id", controller.GetFoodSet)
			protected.POST("/foodsets", controller.CreateFoodSet)
			protected.PATCH("/foodsets", controller.UpdateFoodSet)
			protected.DELETE("/foodsets/:id", controller.DeleteFoodSet)

			// foodtime Routes
			protected.GET("/foodtimes", controller.ListFoodTimes)
			protected.GET("/foodtime/:id", controller.GetFoodTime)
			protected.POST("/foodtimes", controller.CreateFoodTime)
			protected.PATCH("/foodtimes", controller.UpdateFoodTime)
			protected.DELETE("/foodtimes/:id", controller.DeleteFoodTime)

			// WatchVideo Routes
			protected.GET("/food_allocates", controller.ListFoodallocates)
			protected.GET("/foodallocate/:id", controller.GetFoodallocate)
			protected.POST("/food_allocates", controller.CreateFoodallocate)
			protected.PATCH("/food_allocates", controller.UpdateFoodallocate)
			protected.DELETE("/foodallocates/:id", controller.DeleteFoodallocate)

		}
	}

	// nutritionist Routes
	r.POST("/nutritionists", controller.CreateNutritionist)

	// Authentication Routes
	r.POST("/login", controller.Login)

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
