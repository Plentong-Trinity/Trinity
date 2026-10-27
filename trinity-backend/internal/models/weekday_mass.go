package models

type WeekdayMassInput struct {
	Languages  []string `json:"languages" binding:"required,len=1,dive,oneof=English Chinese BM Tamil"`
	DaysOfWeek []string `json:"days_of_week" binding:"required,min=1,unique,dive,oneof=Monday Tuesday Wednesday Thursday Friday"`
	MassTime   string   `json:"mass_time" binding:"required"`
	Remarks    string   `json:"remarks" binding:"max=2000"`
}

type WeekdayMass struct {
	ID string `json:"id"`
	WeekdayMassInput
}
