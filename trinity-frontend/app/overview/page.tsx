"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react"
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
  start_time: Date
  end_time: Date
  color: "blue" | "green" | "red" | "orange"
  time?: string
  location?: string
  description?: string
}

function createDate(year: number, month: number, day: number, hours: number = 0, minutes: number = 0): Date {
  var today = new Date()
  return new Date(year, today.getMonth(), day, hours, minutes)
}

const sampleEvents: CalendarEvent[] = [
  { id: "1", title: "Team Meeting", start_time: createDate(2026, 1, 3, 10, 0), end_time: createDate(2026, 1, 3, 11, 0), color: "blue", time: "10:00 AM - 11:00 AM", location: "Conference Room A", description: "Weekly team sync to discuss project progress and blockers." },
  { id: "2", title: "Project Deadline", start_time: createDate(2026, 1, 5, 17, 0), end_time: createDate(2026, 1, 5, 17, 0), color: "red", time: "5:00 PM", description: "Final submission for the Q1 project deliverables." },
  { id: "3", title: "Lunch with Client", start_time: createDate(2026, 1, 10, 12, 30), end_time: createDate(2026, 1, 10, 14, 0), color: "green", time: "12:30 PM - 2:00 PM", location: "Downtown Bistro", description: "Discuss partnership opportunities with Acme Corp." },
  { id: "4", title: "Code Review", start_time: createDate(2026, 1, 10, 15, 0), end_time: createDate(2026, 1, 10, 16, 0 ), color: "blue", time: "3:00 PM - 4:00 PM", location: "Virtual", description: "Review PR #1234 for the new authentication feature." },
  { id: "5", title: "Workshop", start_time: createDate(2026, 1, 15, 9, 0), end_time: createDate(2026, 1, 15, 12, 0), color: "orange", time: "9:00 AM - 12:00 PM", location: "Training Room", description: "Advanced React patterns and performance optimization workshop." },
  { id: "6", title: "Sprint Planning", start_time: createDate(2026, 2, 18, 14, 0), end_time: createDate(2026, 2, 18, 16, 0), color: "blue", time: "2:00 PM - 4:00 PM", location: "Conference Room B", description: "Plan tasks and priorities for Sprint 12." },
  { id: "7", title: "Product Launch", start_time: createDate(2026, 2, 22, 10, 0), end_time: createDate(2026, 2, 22, 10, 0), color: "green", time: "10:00 AM", location: "Main Auditorium", description: "Official launch event for our new product line." },
  { id: "8", title: "Quarterly Review", start_time: createDate(2026, 2, 28, 13, 0), end_time: createDate(2026, 2, 28, 15, 0), color: "red", time: "1:00 PM - 3:00 PM", location: "Board Room", description: "Q1 performance review with leadership team." },
  { id: "10", title: "1:1 with Manager", start_time: createDate(2026, 2, 12, 16, 0), end_time: createDate(2026, 2, 12, 16, 30), color: "blue", time: "4:00 PM - 4:30 PM", location: "Office 302", description: "Bi-weekly check-in to discuss career development." },
  { id: "11", title: "王者", start_time: createDate(2026, 3, 12, 17, 0), end_time: createDate(2026, 3, 12, 23, 59), color: "blue", time: "5:00 PM - 5:30 PM", location: "Office 302", description: "Bi-weekly check-in to discuss career development." },
  { id: "12", title: "王者", start_time: createDate(2026, 3, 13, 0, 0), end_time: createDate(2026, 3, 13, 23, 59), color: "blue", time: "5:00 PM - 5:30 PM", location: "Office 302", description: "Bi-weekly check-in to discuss career development." },
  { id: "13", title: "王者", start_time: createDate(2026, 3, 14, 0, 0), end_time: createDate(2026, 3, 14, 23, 59), color: "blue", time: "5:00 PM - 5:30 PM", location: "Office 302", description: "Bi-weekly check-in to discuss career development." },
]

const eventColorStyles = {
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  green: "bg-emerald-100 text-emerald-700 border-emerald-200",
  red: "bg-red-100 text-red-700 border-red-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Simple exact match day filters
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
  return events.filter((event) => isSameDay(event.start_time, date) || isSameDay(event.end_time, date) || (event.start_time < date && event.end_time > date))
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", { 
    hour: "numeric", 
    minute: "2-digit", 
    hour12: true 
  })
}

export default function EventCalendarPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent | null>(null)
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

  const goToPrevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1))
  const goToToday = () => setCurrentDate(new Date())

  // FIXED: Accepts the mouse click event context
  const handleEventClick = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation() // Prevents event bubbling layout bugs
    setSelectedEvent(event)
    setIsEventDialogOpen(true)
  }

  return (
    <>
      <main className="min-h-screen bg-muted/30 p-4 md:p-6">
        <div className="mb-6 flex items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">Event Calendar</h1>
        </div>
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

                return (
                  // FIXED: Changed from disabled <button> to structural <div> layout
                  <div
                    key={index}
                    className={cn(
                      "min-h-24 md:min-h-28 border-b border-r last:border-r-0 [&:nth-child(7n)]:border-r-0 p-1 md:p-2 text-left transition-colors",
                      !isCurrentMonth && "bg-muted/50 text-muted-foreground"
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
                          onClick={(e) => handleEventClick(e, event)}
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
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Event Detail Dialog View Modal */}
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
                    {selectedEvent.start_time.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex size-9 items-center justify-center rounded-full bg-muted">
                      <Clock className="size-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-muted-foreground">
                        {formatTime(selectedEvent.start_time)} - {formatTime(selectedEvent.end_time)}
                      </p>
                    </div>
                  </div>
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
    </>
  )
}