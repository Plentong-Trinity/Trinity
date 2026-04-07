"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Clock, MapPin, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface CalendarEvent {
  id: string
  title: string
  date: Date
  color: "blue" | "green" | "red" | "orange"
  time?: string
  location?: string
  description?: string
}

const sampleEvents: CalendarEvent[] = [
  { id: "1", title: "Team Meeting", date: new Date(2026, 1, 3), color: "blue", time: "10:00 AM - 11:00 AM", location: "Conference Room A", description: "Weekly team sync to discuss project progress and blockers." },
  { id: "2", title: "Project Deadline", date: new Date(2026, 1, 5), color: "red", time: "5:00 PM", description: "Final submission for the Q1 project deliverables." },
  { id: "3", title: "Lunch with Client", date: new Date(2026, 1, 10), color: "green", time: "12:30 PM - 2:00 PM", location: "Downtown Bistro", description: "Discuss partnership opportunities with Acme Corp." },
  { id: "4", title: "Code Review", date: new Date(2026, 1, 10), color: "blue", time: "3:00 PM - 4:00 PM", location: "Virtual", description: "Review PR #1234 for the new authentication feature." },
  { id: "5", title: "Workshop", date: new Date(2026, 1, 15), color: "orange", time: "9:00 AM - 12:00 PM", location: "Training Room", description: "Advanced React patterns and performance optimization workshop." },
  { id: "6", title: "Sprint Planning", date: new Date(2026, 1, 18), color: "blue", time: "2:00 PM - 4:00 PM", location: "Conference Room B", description: "Plan tasks and priorities for Sprint 12." },
  { id: "7", title: "Product Launch", date: new Date(2026, 1, 22), color: "green", time: "10:00 AM", location: "Main Auditorium", description: "Official launch event for our new product line." },
  { id: "8", title: "Quarterly Review", date: new Date(2026, 1, 28), color: "red", time: "1:00 PM - 3:00 PM", location: "Board Room", description: "Q1 performance review with leadership team." },
  { id: "9", title: "Design Review", date: new Date(2026, 1, 3), color: "orange", time: "2:00 PM - 3:00 PM", location: "Design Lab", description: "Review mockups for the new dashboard redesign." },
  { id: "10", title: "1:1 with Manager", date: new Date(2026, 1, 12), color: "blue", time: "4:00 PM - 4:30 PM", location: "Office 302", description: "Bi-weekly check-in to discuss career development." },
]

const eventColorStyles = {
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  green: "bg-emerald-100 text-emerald-700 border-emerald-200",
  red: "bg-red-100 text-red-700 border-red-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

function isToday(date: Date) {
  return isSameDay(date, new Date())
}

function getEventsForDate(date: Date, events: CalendarEvent[]) {
  return events.filter((event) => isSameDay(event.date, date))
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export default function EventCalendarPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date(2026, 1, 1))
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent | null>(null)
  const [isDayDialogOpen, setIsDayDialogOpen] = React.useState(false)
  const [isEventDialogOpen, setIsEventDialogOpen] = React.useState(false)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const daysInPrevMonth = getDaysInMonth(year, month - 1)

  const prevMonthDays: Date[] = []
  for (let i = firstDay - 1; i >= 0; i--) {
    prevMonthDays.push(new Date(year, month - 1, daysInPrevMonth - i))
  }

  const currentMonthDays: Date[] = []
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push(new Date(year, month, i))
  }

  const totalCells = 42
  const nextMonthDays: Date[] = []
  const remainingCells = totalCells - prevMonthDays.length - currentMonthDays.length
  for (let i = 1; i <= remainingCells; i++) {
    nextMonthDays.push(new Date(year, month + 1, i))
  }

  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const handleDayClick = (date: Date) => {
    setSelectedDate(date)
    // setIsDayDialogOpen(true)
  }

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedEvent(event)
    setIsEventDialogOpen(true)
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate, sampleEvents) : []

  return (
    <main className="min-h-screen bg-muted/30 p-4 md:p-6">
      <Card className="mx-auto max-w-6xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold">
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={goToPrevMonth}>
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={goToNextMonth}>
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 md:p-6 md:pt-0">
          <div className="grid grid-cols-7 border-b">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="border-r last:border-r-0 bg-muted/50 py-2 text-center text-sm font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {allDays.map((date, index) => {
              const dayEvents = getEventsForDate(date, sampleEvents)
              const isCurrentMonth = date.getMonth() === month
              const isTodayDate = isToday(date)
              const isSelected = selectedDate && isSameDay(date, selectedDate)

              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleDayClick(date)}
                  className={cn(
                    "min-h-24 md:min-h-28 border-b border-r last:border-r-0 [&:nth-child(7n)]:border-r-0 p-1 md:p-2 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-inset",

                    !isCurrentMonth && "bg-muted/30",

                    // 👇 selected day (blue)
                    isSelected && "bg-blue-100 text-blue-700 border border-blue-300",

                    // 👇 normal hover (only if NOT selected)
                    !isSelected && "hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={cn(
                        "inline-flex size-6 md:size-7 items-center justify-center rounded-full text-sm",
                        !isCurrentMonth && "text-muted-foreground",
                        isTodayDate && "bg-primary text-primary-foreground font-medium"
                      )}
                    >
                      {date.getDate()}
                    </span>
                  </div>
                  <div className="mt-1 space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        role="button"
                        tabIndex={0}
                        onClick={(e) => handleEventClick(event, e)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            handleEventClick(event, e as unknown as React.MouseEvent)
                          }
                        }}
                        className={cn(
                          "truncate rounded px-1.5 py-0.5 text-xs font-medium border cursor-pointer hover:opacity-80 transition-opacity",
                          eventColorStyles[event.color]
                        )}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="px-1.5 text-xs text-muted-foreground">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Day Detail Dialog */}
      <Dialog open={isDayDialogOpen} onOpenChange={setIsDayDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="size-5" />
              {selectedDate?.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </DialogTitle>
            <DialogDescription>
              {selectedDateEvents.length === 0
                ? "No events scheduled for this day."
                : `${selectedDateEvents.length} event${selectedDateEvents.length > 1 ? "s" : ""} scheduled`}
            </DialogDescription>
          </DialogHeader>
          {selectedDateEvents.length > 0 && (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {selectedDateEvents.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => {
                    setSelectedEvent(event)
                    setIsDayDialogOpen(false)
                    setIsEventDialogOpen(true)
                  }}
                  className={cn(
                    "w-full text-left rounded-lg border p-3 transition-all hover:shadow-md",
                    eventColorStyles[event.color]
                  )}
                >
                  <h4 className="font-medium">{event.title}</h4>
                  {event.time && (
                    <p className="mt-1 flex items-center gap-1.5 text-sm opacity-80">
                      <Clock className="size-3.5" />
                      {event.time}
                    </p>
                  )}
                  {event.location && (
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm opacity-80">
                      <MapPin className="size-3.5" />
                      {event.location}
                    </p>
                  )}
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Event Detail Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div
                  className={cn(
                    "inline-flex self-start rounded-full px-2.5 py-0.5 text-xs font-medium border mb-2",
                    eventColorStyles[selectedEvent.color]
                  )}
                >
                  {selectedEvent.color.charAt(0).toUpperCase() + selectedEvent.color.slice(1)}
                </div>
                <DialogTitle className="text-xl">{selectedEvent.title}</DialogTitle>
                <DialogDescription>
                  {selectedEvent.date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {selectedEvent.time && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex size-9 items-center justify-center rounded-full bg-muted">
                      <Clock className="size-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-muted-foreground">{selectedEvent.time}</p>
                    </div>
                  </div>
                )}
                {selectedEvent.location && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex size-9 items-center justify-center rounded-full bg-muted">
                      <MapPin className="size-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{selectedEvent.location}</p>
                    </div>
                  </div>
                )}
                {selectedEvent.description && (
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-1">Description</p>
                    <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
