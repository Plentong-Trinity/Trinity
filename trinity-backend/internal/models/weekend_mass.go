package models

type WeekendMassInput struct {
	Languages  []string `json:"languages" binding:"required,len=1,dive,oneof=English Chinese BM Tamil"`
	DaysOfWeek []string `json:"days_of_week" binding:"required,len=1,dive,oneof=Saturday Sunday"`
	MassTime   string   `json:"mass_time" binding:"required"`
	Remarks    string   `json:"remarks" binding:"max=2000"`
}

type WeekendMass struct {
	ID string `json:"id"`
	WeekendMassInput
}
