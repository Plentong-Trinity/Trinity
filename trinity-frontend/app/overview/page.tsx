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
import { getToken, isTokenExpired, removeToken } from "@/lib/auth"
import { useRouter } from "next/navigation"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

interface CalendarEvent {
  id: string
  title: string
  start_time: Date
  end_time: Date
  color: {
    background: string
    border: string
    text: string
  }
  status: "pending" | "approved"
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

const statusColorStyles = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
}

function getEventColor(index: number): CalendarEvent["color"] {
  const hue = (index * 137.508) % 360
  return {
    background: `hsl(${hue} 75% 90%)`,
    border: `hsl(${hue} 60% 72%)`,
    text: `hsl(${hue} 55% 28%)`,
  }
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
  const router = useRouter()
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [events, setEvents] = React.useState<CalendarEvent[]>([])
  const [eventsLoading, setEventsLoading] = React.useState(true)
  const [eventsError, setEventsError] = React.useState<string | null>(null)
  const [refreshKey, setRefreshKey] = React.useState(0)
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent | null>(null)
  const [isEventDialogOpen, setIsEventDialogOpen] = React.useState(false)

  React.useEffect(() => {
    const controller = new AbortController()

    async function loadEvents() {
      const token = getToken()
      if (!token || isTokenExpired()) {
        removeToken()
        router.replace("/login")
        return
      }

      setEventsLoading(true)
      setEventsError(null)
      try {
        const response = await fetch(`${API_URL}/api/room-bookings/calendar`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        })

        if (response.status === 401) {
          removeToken()
          router.replace("/login")
          return
        }
        if (!response.ok) throw new Error("Failed to load overview bookings.")

        const records = await response.json() as CalendarEventResponse[]
        const loadedEvents = records.flatMap((record): CalendarEvent[] => {
          const start_time = new Date(record.start_time)
          const end_time = new Date(record.end_time)
          const status = record.status.toLowerCase()
          if (
            Number.isNaN(start_time.getTime()) ||
            Number.isNaN(end_time.getTime()) ||
            end_time < start_time ||
            (status !== "pending" && status !== "approved")
          ) {
            return []
          }

          return [{
            id: record.id,
            title: record.title || record.description || "Room booking",
            start_time,
            end_time,
            status,
            color: getEventColor(0),
            time: `${formatTime(start_time)} - ${formatTime(end_time)}`,
            location: record.location || undefined,
            description: record.description || undefined,
          }]
        })
        const colorsById = new Map(
          Array.from(new Set(loadedEvents.map((event) => event.id)))
            .sort((a, b) => a.localeCompare(b))
            .map((id, index) => [id, getEventColor(index)])
        )
        loadedEvents.forEach((event) => {
          event.color = colorsById.get(event.id) ?? getEventColor(0)
        })
        setEvents(loadedEvents)
      } catch (error) {
        if (!controller.signal.aborted) {
          setEventsError(error instanceof Error ? error.message : "Failed to load overview bookings.")
        }
      } finally {
        if (!controller.signal.aborted) setEventsLoading(false)
      }
    }

    void loadEvents()
    return () => controller.abort()
  }, [refreshKey, router])

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
          {(eventsLoading || eventsError) && (
            <div className="flex items-center justify-between gap-4 border-y px-4 py-3 text-sm">
              <p className={eventsError ? "text-red-700" : "text-muted-foreground"} role={eventsError ? "alert" : "status"}>
                {eventsError ?? "Loading bookings..."}
              </p>
              {eventsError && (
                <Button variant="outline" size="sm" onClick={() => setRefreshKey((key) => key + 1)}>
                  Retry
                </Button>
              )}
            </div>
          )}
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
                const dayEvents = getEventsForDate(date, events)
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
                            "truncate rounded border px-1.5 py-0.5 text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity"
                          )}
                          style={{
                            backgroundColor: event.color.background,
                            borderColor: event.color.border,
                            color: event.color.text,
                          }}
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
                      statusColorStyles[selectedEvent.status]
                    )}
                  >
                    {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
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