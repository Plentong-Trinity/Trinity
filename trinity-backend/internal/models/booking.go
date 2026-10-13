package models

type RoomBooking struct {
	ID           string `json:"id"`
	Requester    string `json:"requester"`
	Ministry     string `json:"ministry"`
	Room         string `json:"room"`
	Date         string `json:"date"`
	EndDate      string `json:"end_date,omitempty"`
	Time         string `json:"time"`
	Purpose      string `json:"purpose"`
	Participants int    `json:"participants"`
	Status       string `json:"status"`
	DenialReason string `json:"denial_reason,omitempty"`
}

type CreateRoomBookingRequest struct {
	Requester    string   `json:"requester" binding:"required"`
	Ministry     string   `json:"ministry" binding:"required"`
	Rooms        []string `json:"rooms" binding:"required,min=1,dive,required"`
	Date         string   `json:"date" binding:"required"`
	EndDate      string   `json:"end_date"`
	StartTime    string   `json:"start_time" binding:"required"`
	EndTime      string   `json:"end_time" binding:"required"`
	Purpose      string   `json:"purpose" binding:"required"`
	Participants int      `json:"participants" binding:"required,gt=0"`
}

type UpdateRoomBookingRequest struct {
	Status       string `json:"status" binding:"required,oneof=pending approved denied"`
	DenialReason string `json:"denial_reason"`
}
