package models

type SpecialMassInput struct {
	Title     string   `json:"title" binding:"required,max=255"`
	Languages []string `json:"languages" binding:"required,min=1,max=4,unique,dive,oneof=English Chinese BM Tamil"`
	MassDate  string   `json:"mass_date" binding:"required"`
	MassTime  string   `json:"mass_time" binding:"required"`
	Remarks   string   `json:"remarks" binding:"max=2000"`
}

type SpecialMass struct {
	ID string `json:"id"`
	SpecialMassInput
}
