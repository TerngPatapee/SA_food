package entity

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"gorm.io/driver/sqlite"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

// สร้าง DataBase

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("FoodData.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// Migrate the schema

	database.AutoMigrate(

		&Treatmentrecord{},
		&Nutritionist{},
		&Foodset{},
		&Foodtime{},
		&Foodallocate{})

	db = database

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	N1 := Nutritionist{
		Name:     "Kita",
		Pid:      "0000000000001",
		Password: string(password),
	}
	db.Model(&Nutritionist{}).Create(&N1)

	N2 := Nutritionist{
		Name:     "run",
		Pid:      "0000000000002",
		Password: string(password),
	}
	db.Model(&Nutritionist{}).Create(&N2)

	// --- Video Data -----------------------------------------------------------------
	set1 := Foodset{
		Foodmenu:  "ผัดกะเพรา",
		Fooddrink: "น้ำผลไม้",
		Setprice:  "50",
	}
	db.Model(&Foodset{}).Create(&set1)

	set2 := Foodset{
		Foodmenu:  "ข้าวต้ม",
		Fooddrink: "น้ำผลไม้",
		Setprice:  "45",
	}
	db.Model(&Foodset{}).Create(&set2)

	set3 := Foodset{
		Foodmenu:  "งดอหาร",
		Fooddrink: "นม",
		Setprice:  "10",
	}
	db.Model(&Foodset{}).Create(&set3)

	// --- TreatmentRecord -----------------------------------------------------------------
	A1001 := Treatmentrecord{
		Patientid:   "A1001",
		Doctorid:    "AN1001",
		Treatment:   "Heart Transplant",
		Foodtype:    "ควรทานอาหารเหลว งดน้ำตาลในอาหารของผู้ป่วย",
		Medid:       "MED6001",
		Medamount:   3,
		Equipmentid: "002",
		Cost:        5000,
	}
	db.Model(&Treatmentrecord{}).Create(&A1001)

	A1002 := Treatmentrecord{
		Patientid:   "ฤ1002",
		Doctorid:    "AN1001",
		Treatment:   "influenza",
		Foodtype:    "ทาอาหารได้ตามปกติ",
		Medid:       "MED6002",
		Medamount:   3,
		Equipmentid: "002",
		Cost:        5000,
	}
	db.Model(&Treatmentrecord{}).Create(&A1002)

	A1003 := Treatmentrecord{
		Patientid:   "A1003",
		Doctorid:    "AN1003",
		Treatment:   "Gastric lavage",
		Foodtype:    "ควรทานอาหารอ่อน เน้นโปรตีนให้ผู้ป่วยเป็นหลัก",
		Medid:       "MED6001",
		Medamount:   3,
		Equipmentid: "001",
		Cost:        5000,
	}
	db.Model(&Treatmentrecord{}).Create(&A1003)

	// --- FoodTime Data -----------------------------------------------------------------
	time1 := Foodtime{
		Foodtime: "เช้า เที่ยง เย็น",
	}
	db.Model(&Foodtime{}).Create(&time1)

	time2 := Foodtime{
		Foodtime: "เช้า เที่ยง",
	}
	db.Model(&Foodtime{}).Create(&time2)

	time3 := Foodtime{
		Foodtime: "เช้า",
	}
	db.Model(&Foodtime{}).Create(&time3)

	time4 := Foodtime{
		Foodtime: "งดอาหาร",
	}
	db.Model(&Foodtime{}).Create(&time4)

	// Foodallocate 1
	db.Model(&Foodallocate{}).Create(&Foodallocate{
		Treatmentrecord: A1001,
		Foodset:         set2,
		Foodtime:        time2,
		Nutritionist:    N2,
	})
	// Foodallocate 2
	db.Model(&Foodallocate{}).Create(&Foodallocate{
		Treatmentrecord: A1001,
		Foodset:         set2,
		Foodtime:        time2,
		Nutritionist:    N1,
	})
	// Foodallocate 3
	db.Model(&Foodallocate{}).Create(&Foodallocate{
		Treatmentrecord: A1001,
		Foodset:         set2,
		Foodtime:        time2,
		Nutritionist:    N1,
	})

	//
	// === Query
	//
	/*
		var target Nutritionist
		db.Model(&Nutritionist{}).Find(&target, db.Where("personid = ?", "0000000000001"))

		var watchedPlaylist Playlist
		db.Model(&Playlist{}).Find(&watchedPlaylist, db.Where("title = ? and owner_id = ?", "Watched", target.ID))

		var watchedList []*WatchVideo
		db.Model(&WatchVideo{}).
			Joins("Playlist").
			Joins("Resolution").
			Joins("Video").
			Find(&watchedList, db.Where("playlist_id = ?", watchedPlaylist.ID))

		for _, wl := range watchedList {
			fmt.Printf("Watch Video: %v\n", wl.ID)
			fmt.Printf("%v\n", wl.Playlist.Title)
			fmt.Printf("%v\n", wl.Resolution.Value)
			fmt.Printf("%v\n", wl.Video.Name)
			fmt.Println("====")
		}*/

}
