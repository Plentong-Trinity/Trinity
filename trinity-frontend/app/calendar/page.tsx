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
import { Toaster, toast } from "sonner"

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
  // return new Date(year, month - 1, day) // 👈 convert 1–12 → 0–11
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

function isFullDayEventOnDate(event: CalendarEvent, date: Date) {
  const dayStart = new Date(date)
  const dayEnd = new Date(date)
  dayStart.setHours(0, 0, 0, 0)
  dayEnd.setHours(23, 59, 0, 0)

  return event.start_time <= dayStart && event.end_time >= dayEnd
}

function getFutureEventDates(selectedDate: Date | null, events: CalendarEvent[]) {
  const blockedDates = new Set<string>();
  
  events.forEach(event => {
    let current = new Date(event.start_time);
    const end = new Date(event.end_time);
    
    // Normalize to midnight for comparison
    current.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    // Loop through every day the event occupies and add to the blocked set
    while (current <= end) {
      blockedDates.add(`${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`);
      current.setDate(current.getDate() + 1);
    }
  });

  return blockedDates;
}

function getNextEvent(startDate: Date | null, events: CalendarEvent[]) {
  if (!startDate) return null;
  
  // Create a copy to avoid mutating the original date
  const dayStart = new Date(startDate);
  dayStart.setHours(0, 0, 0, 0)
  dayStart.setDate(startDate.getDate() + 1); // Move to the start of the next day
  
  // Find all events that start after this day
  const futureEvents = events
    .filter((event) => event.start_time > dayStart)
    .sort((a, b) => a.start_time.getTime() - b.start_time.getTime());

  // Return only the earliest one (the immediate next constraint)
  return futureEvents.length > 0 ? futureEvents[0] : null;
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
  const [startDate, setStartDate] = React.useState<Date | null>(null)
  const [endDate, setEndDate] = React.useState<Date | null>(null)
  const nextConstraint = React.useMemo(() => getNextEvent(startDate, sampleEvents), [startDate]);
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent | null>(null)
  const [isDayDialogOpen, setIsDayDialogOpen] = React.useState(false)
  const [isEventDialogOpen, setIsEventDialogOpen] = React.useState(false)
  const toastIdRef = React.useRef<string | number | null>(null)
  const endDateToastIdRef = React.useRef<string | number | null>(null)

  React.useEffect(() => {
    // Show toast only once on mount
    if (!toastIdRef.current) {
      toastIdRef.current = toast.info("Please select a start date", {
        description: "Click on a date to view available booking times",
        duration: Infinity, // Keep toast until dismissed
      })
    }
  }, [])

  React.useEffect(() => {
    if (startDate) {
      // Dismiss toast when a date is selected
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current)
        toastIdRef.current = null
      }
    } else {
      // Show toast again when date is deselected
      if (!toastIdRef.current) {
        toastIdRef.current = toast.info("Please select a start date", {
          description: "Click on a date to view available booking times",
          duration: Infinity,
        })
      }
    }
  }, [startDate])

  React.useEffect(() => {
    if (startDate && !endDate) {
      // Show toast when start date is selected but end date is not
      if (!endDateToastIdRef.current) {
        endDateToastIdRef.current = toast.info("Please select an end date", {
          description: "Click on another date to complete your booking",
          duration: Infinity,
        })
      }
    } else {
      // Dismiss when end date is selected or start date is unselected
      if (endDateToastIdRef.current) {
        toast.dismiss(endDateToastIdRef.current)
        endDateToastIdRef.current = null
      }
    }
  }, [startDate, endDate])

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

  // Logic to determine if a date is within the current selection
  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false
    return date >= startDate && date <= endDate
  }

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
    // Cannot click on dates after the constraint
    if (nextConstraint && date > nextConstraint.start_time) {
      return;
    }

    // 1. Reset if clicking the start date again
    if (startDate && isSameDay(startDate, date)) {
      setStartDate(null);
      setEndDate(null);
      return;
    }

    // 2. First Click: Set Start Date
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      return;
    }

    // 3. Second Click: Set End Date
    if (startDate && !endDate) {
      // Rule A: Cannot select a date before the start date
      if (date < startDate) {
        setStartDate(date); // Move start date to the new earlier click
        return;
      }

      // Rule B: Cannot select a date past the next existing event
      if (nextConstraint && date > nextConstraint.start_time) {
        toast.error("Booking Conflict", {
          description: `You cannot book past the ${nextConstraint.title} on ${nextConstraint.start_time.toLocaleDateString()}.`
        });
        return;
      }

      setEndDate(date);
      setIsDayDialogOpen(true);
    }
  }

  const isConstraintDay = (date: Date) => {
    return nextConstraint && isSameDay(date, nextConstraint.start_time);
  }

  // const handleDayClick = (date: Date) => {
  //   setSelectedDate(date)
  //   // setIsDayDialogOpen(true)
  // }

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedEvent(event)
    setIsEventDialogOpen(true)
  }

  const selectedDateEvents = startDate ? getEventsForDate(startDate, sampleEvents) : []
  const futureEventDates = getFutureEventDates(startDate, sampleEvents)

  return (
    <>
      <Toaster />
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
              const isStartDate = startDate && isSameDay(date, startDate)
              const isEndDate = endDate && isSameDay(date, endDate)
              const isFutureEventDate = futureEventDates.has(
                `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
              )
              const inRange = isDateInRange(date)
              const isWall = isConstraintDay(date)
              const isFullyBooked = dayEvents.some((event) => isFullDayEventOnDate(event, date))

              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleDayClick(date)}
                  disabled={!!((nextConstraint && date > nextConstraint.start_time) || (startDate && date < startDate) || (date < new Date() && !isTodayDate) || isFullyBooked)} // Disable past dates (except today) and dates after constraint or before start date
                  className={cn(
                    "min-h-24 md:min-h-28 border-b border-r last:border-r-0 [&:nth-child(7n)]:border-r-0 p-1 md:p-2 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-inset",

                    !isCurrentMonth && "bg-muted/50 text-muted-foreground",

                    (date < new Date() && !isTodayDate) && "bg-muted/40 text-muted-foreground opacity-50 cursor-not-allowed hover:bg-muted/40",

                    isFullyBooked && "bg-red-100 text-red-700 border border-red-300 cursor-not-allowed hover:bg-red-100",

                    inRange && "bg-blue-50/50",

                    // 👇 selected day (blue)z
                    isStartDate || isEndDate ? "bg-blue-100 text-blue-700 border border-blue-300" : "",

                    // 👇 ALL future event dates (red)
                    !isStartDate && isWall ? "bg-red-100 text-red-700 border border-red-300" : "hover:bg-muted/50" ,  
                    
                    isEndDate && "bg-blue-100 text-blue-700 border border-blue-300",
                    
                    // Mute dates after constraint or before start date
                    ((nextConstraint && date > nextConstraint.start_time) || (startDate && date < startDate)) && "bg-muted/40 text-muted-foreground opacity-50 cursor-not-allowed hover:bg-muted/40",

                    // normal
                    !isStartDate && !isEndDate && !isFutureEventDate && "hover:bg-muted/25"
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
                  <div className="flex items-center justify-center mt-1 px-1">
                    {isStartDate && dayEvents.length > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg px-2 py-1 text-center w-full">
                        <div className="text-xs font-medium text-blue-800 mb-0.5">
                          can book after
                        </div>
                        <div className="text-sm font-semibold text-blue-900">
                          {formatTime(dayEvents[dayEvents.length - 1].end_time)}
                        </div>
                      </div>
                    )}
                    {isWall && !isStartDate && (
                      <div className={cn(
                        "bg-orange-50 border border-orange-200 rounded-lg px-2 py-1 text-center w-full",
                        isEndDate ? "bg-blue-50 border-blue-200" : "bg-red-50 border-red-200"
                      )}>
                        <div className="text-xs font-medium text-orange-800 mb-0.5">
                          can book until
                        </div>
                        <div className="text-sm font-semibold text-orange-900">
                          {formatTime(dayEvents[0].start_time)}
                        </div>
                      </div>
                    )}
                    {isFullyBooked && (
                      <div className="rounded-lg px-2 py-1 text-center w-full">
                        <div className="text-xs font-medium text-red-700 mb-0.5">
                          Fully Booked
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-1 space-y-1">
                    {(!startDate || !isWall) && dayEvents.slice(0, 3).map((event) => (
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
                          eventColorStyles[event.color],

                          ((startDate && date > startDate) || (startDate && event.end_time >= startDate) || isFullyBooked) && "border-red-300 hidden" // 👈 hide events on future event dates
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

      {/* Day Detail Dialog - Range Confirmation */}
      <Dialog 
        open={isDayDialogOpen} 
        onOpenChange={(open) => {
          setIsDayDialogOpen(open);
          // Optional: If you want to keep the range even if they close the modal, 
          // remove the reset logic below.
          if (!open) { 
            setStartDate(null);
            setEndDate(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="size-5 text-blue-600" />
              Confirm Your Booking Range
            </DialogTitle>
            <DialogDescription className="pt-2">
              {startDate && endDate ? (
                <div className="rounded-lg bg-muted p-4 text-foreground">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-muted-foreground">From:</span>
                    <span className="font-semibold">{startDate.toLocaleDateString("en-US", { dateStyle: 'long' })}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Until:</span>
                    <span className="font-semibold">{endDate.toLocaleDateString("en-US", { dateStyle: 'long' })}</span>
                  </div>
                  <div className="mt-4 border-t pt-2 text-center text-xs text-blue-600 font-medium">
                    Total Duration: {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1} Day(s)
                  </div>
                </div>
              ) : (
                "Please select a valid range."
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-4">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              onClick={() => {
                toast.success("Booking range confirmed!", {
                  description: `Scheduled from ${startDate?.toLocaleDateString()} to ${endDate?.toLocaleDateString()}`
                });
                setIsDayDialogOpen(false);
                // Here you would typically navigate to a checkout page or call an API
              }}
            >
              Yes, Proceed with Booking
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
                setIsDayDialogOpen(false);
                toast.info("Selection cleared");
              }}
            >
              No, Reselect Dates
            </Button>
          </div>
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
