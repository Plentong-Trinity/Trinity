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
import { useRouter, useSearchParams } from "next/navigation"
import { getToken, isTokenExpired, removeToken } from "@/lib/auth"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

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

interface CalendarEventResponse {
  id: string
  title: string
  start_time: string
  end_time: string
  status: string
  location: string
  description: string
}

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

function combineDateAndTime(date: Date, time: string) {
  const [hours, minutes] = time.split(":").map(Number)
  const result = new Date(date)
  result.setHours(hours, minutes, 0, 0)
  return result
}

function bookingOverlapsEvent(start: Date, end: Date, events: CalendarEvent[]) {
  return end <= start || events.some((event) => start < event.end_time && end > event.start_time)
}

export default function EventCalendarPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [startDate, setStartDate] = React.useState<Date | null>(null)
  const [endDate, setEndDate] = React.useState<Date | null>(null)
  const [events, setEvents] = React.useState<CalendarEvent[]>([])
  const [eventsLoading, setEventsLoading] = React.useState(true)
  const [eventsError, setEventsError] = React.useState<string | null>(null)
  const [roomsReady, setRoomsReady] = React.useState(false)
  const nextConstraint = React.useMemo(() => getNextEvent(startDate, events), [startDate, events]);
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent | null>(null)
  const [isDayDialogOpen, setIsDayDialogOpen] = React.useState(false)
  const [isEventDialogOpen, setIsEventDialogOpen] = React.useState(false)
  const toastIdRef = React.useRef<string | number | null>(null)
  const endDateToastIdRef = React.useRef<string | number | null>(null)
  const [startTime, setStartTime] = React.useState<string>("09:00");
  const [endTime, setEndTime] = React.useState<string>("18:00");
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedRooms, setSelectedRooms] = React.useState<string[]>([])

  React.useEffect(() => {
    if (!roomsReady) return

    let isCurrent = true

    const loadEvents = async () => {
      const token = getToken()
      if (!token || isTokenExpired()) {
        removeToken()
        router.replace("/login")
        return
      }

      setEventsLoading(true)
      setEventsError(null)
      try {
        const params = new URLSearchParams()
        if (selectedRooms.length > 0) params.set("rooms", selectedRooms.join(","))
        const query = params.toString()
        const response = await fetch(`${API_URL}/api/room-bookings/calendar${query ? `?${query}` : ""}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (response.status === 401) {
          removeToken()
          router.replace("/login")
          return
        }
        if (!response.ok) throw new Error("Failed to load calendar events")

        const records = (await response.json()) as CalendarEventResponse[]
        const loadedEvents = records.map((record) => {
          const start_time = new Date(record.start_time)
          const end_time = new Date(record.end_time)
          return {
            id: record.id,
            title: record.title,
            start_time,
            end_time,
            color: record.status.toLowerCase() === "approved" ? "green" as const : "orange" as const,
            time: `${formatTime(start_time)} - ${formatTime(end_time)}`,
            location: record.location || undefined,
            description: record.description || undefined,
          }
        }).filter((event) => !Number.isNaN(event.start_time.getTime()) && !Number.isNaN(event.end_time.getTime()))

        if (isCurrent) setEvents(loadedEvents)
      } catch (error) {
        if (isCurrent) setEventsError(error instanceof Error ? error.message : "Failed to load calendar events")
      } finally {
        if (isCurrent) setEventsLoading(false)
      }
    }

    void loadEvents()
    return () => {
      isCurrent = false
    }
  }, [router, roomsReady, selectedRooms])

  React.useEffect(() => {
    const roomsParam = searchParams.get("rooms")
    if (roomsParam) {
      const rooms = roomsParam
        .split(",")
        .map((room) => room.trim())
        .filter(Boolean)

      if (rooms.length) {
        setSelectedRooms(rooms)
        sessionStorage.setItem("selectedRooms", JSON.stringify(rooms))
      }
    } else {
      const storedRooms = sessionStorage.getItem("selectedRooms")
      if (storedRooms) {
        try {
          const parsed = JSON.parse(storedRooms)
          if (Array.isArray(parsed)) setSelectedRooms(parsed)
        } catch (error) {
          console.error("Failed to parse selectedRooms:", error)
        }
      }
    }
      setRoomsReady(true)
  }, [searchParams])

  React.useEffect(() => {
    if (selectedRooms.length > 0) {
      sessionStorage.setItem("selectedRooms", JSON.stringify(selectedRooms))
    }
  }, [selectedRooms])

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

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 24; hour++) {
      for (let min of ["00", "30"]) {
        slots.push(`${hour.toString().padStart(2, '0')}:${min}`);
      }
    }
    return slots;
  };

  const getAvailableTimes = (targetDate: Date, type: 'start' | 'end') => {
    return generateTimeSlots().filter((slot) => {
      const [hour, minute] = slot.split(":").map(Number)
      if (type === "start" && (hour > 22 || (hour === 22 && minute > 0))) return false

      const candidate = combineDateAndTime(targetDate, slot)
      return !events.some((event) =>
        type === "start"
          ? candidate >= event.start_time && candidate < event.end_time
          : candidate > event.start_time && candidate < event.end_time,
      )
    })
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

  const selectedDateEvents = startDate ? getEventsForDate(startDate, events) : []
  const futureEventDates = getFutureEventDates(startDate, events)
  const availableStartTimes = startDate ? getAvailableTimes(startDate, "start") : []
  const availableEndTimes = endDate ? getAvailableTimes(endDate, "end") : []
  const canConfirmBooking = Boolean(
    startDate &&
    endDate &&
    availableStartTimes.includes(startTime) &&
    availableEndTimes.includes(endTime) &&
    !bookingOverlapsEvent(
      combineDateAndTime(startDate, startTime),
      combineDateAndTime(endDate, endTime),
      events,
    ),
  )

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
          {eventsLoading && <p className="px-4 py-3 text-sm text-muted-foreground">Loading bookings...</p>}
          {eventsError && <p role="alert" className="px-4 py-3 text-sm text-red-600">{eventsError}</p>}
          {!eventsLoading && !eventsError && events.length === 0 && (
            <p className="px-4 py-3 text-sm text-muted-foreground">No bookings found.</p>
          )}
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
              const dayEvents = getEventsForDate(date, events)
              const isCurrentMonth = date.getMonth() === month
              const isTodayDate = isToday(date)
              const isStartDate = startDate && isSameDay(date, startDate)
              const isEndDate = endDate && isSameDay(date, endDate)
              const isFutureEventDate = futureEventDates.has(
                `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
              )
              const inRange = isDateInRange(date)
              const isWall = isConstraintDay(date)
              const isFullyBooked = getAvailableTimes(date, startDate ? "end" : "start").length === 0

              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleDayClick(date)}
                  disabled={!!((nextConstraint && date > nextConstraint.start_time) || (startDate && date < startDate) || date < new Date() || isFullyBooked)} // Disable past dates, including today, and dates after constraint or before start date
                  className={cn(
                    "min-h-24 md:min-h-28 border-b border-r last:border-r-0 [&:nth-child(7n)]:border-r-0 p-1 md:p-2 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-inset",

                    !isCurrentMonth && "bg-muted/50 text-muted-foreground",

                    date < new Date() && "bg-muted/40 text-muted-foreground opacity-50 cursor-not-allowed hover:bg-muted/40",

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
                        !isCurrentMonth && !isTodayDate && "text-muted-foreground",
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
                <div className="space-y-4">
                  {/* Date Summary Card */}
                  <div className="rounded-lg bg-muted p-4 text-foreground">
                    <div className="flex justify-between items-center mb-2 text-sm">
                      <span className="font-medium text-muted-foreground">From:</span>
                      <span className="font-semibold">{startDate.toLocaleDateString("en-US", { dateStyle: 'long' })}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-muted-foreground">Until:</span>
                      <span className="font-semibold">{endDate.toLocaleDateString("en-US", { dateStyle: 'long' })}</span>
                    </div>
                  </div>

                  {/* Time Selectors Section */}
                  <div className="grid grid-cols-2 gap-4 border-t pt-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">
                        <Clock className="size-3" /> Start Time
                      </label>
                      <select 
                        className="w-full bg-background border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      >
                        {!availableStartTimes.includes(startTime) && <option value={startTime} disabled>Unavailable</option>}
                        {availableStartTimes.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">
                        <Clock className="size-3" /> End Time
                      </label>
                      <select 
                        className="w-full bg-background border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      >
                        {!availableEndTimes.includes(endTime) && <option value={endTime} disabled>Unavailable</option>}
                        {availableEndTimes.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-2 border-t pt-2 text-center text-xs text-blue-600 font-medium">
                    Total Duration: {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1} Day(s)
                  </div>
                </div>
              ) : (
                "Please select a valid range."
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-4">
            {!canConfirmBooking && (
              <p role="status" className="text-sm text-red-600">
                The selected booking time overlaps an existing event or has no available times.
              </p>
            )}
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              disabled={!canConfirmBooking}
              onClick={() => {
                toast.success("Booking range confirmed!", {
                  description: `Scheduled from ${startDate?.toLocaleDateString()} ${startTime} to ${endDate?.toLocaleDateString()} ${endTime}`
                });
                setIsDayDialogOpen(false);
                const params = new URLSearchParams();

                if (startDate) {
                  params.set("date", `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`);
                }
                if (endDate) {
                  params.set("endDate", `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`);
                }
                if (selectedRooms.length > 0) {
                  params.set("rooms", selectedRooms.join(","));
                }
                if (startTime) {
                  params.set("start", startTime);
                }
                if (endTime) {
                  params.set("end", endTime);
                }

                router.push(`/form?${params.toString()}`);
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
