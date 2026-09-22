"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  DoorOpen,
  History,
  MapPin,
  Plus,
  Search,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRequireAuth } from "@/hooks/use-auth"
import { decodeToken, getToken } from "@/lib/auth"
import { cn } from "@/lib/utils"

type BookingStatus = "approved" | "pending" | "completed" | "cancelled"

type Booking = {
  id: string
  room: string
  location: string
  date: string
  time: string
  purpose: string
  participants: number
  status: BookingStatus
  activity: string
}

// Replace this sample list with GET /api/bookings when the booking API is ready.
const initialBookings: Booking[] = [
  {
    id: "BK-0261",
    room: "St. Joseph Hall",
    location: "Ground floor",
    date: "2026-09-27",
    time: "2:00 PM – 4:00 PM",
    purpose: "Youth Ministry Meeting",
    participants: 24,
    status: "approved",
    activity: "Approved on 21 Sep, 10:32 AM",
  },
  {
    id: "BK-0268",
    room: "Room 9",
    location: "First floor",
    date: "2026-10-03",
    time: "8:00 PM – 9:30 PM",
    purpose: "Choir Practice",
    participants: 16,
    status: "pending",
    activity: "Submitted on 22 Sep, 8:14 PM",
  },
  {
    id: "BK-0243",
    room: "Hall 2",
    location: "Ground floor",
    date: "2026-09-13",
    time: "10:00 AM – 12:00 PM",
    purpose: "Catechism Class",
    participants: 30,
    status: "completed",
    activity: "Completed on 13 Sep, 12:00 PM",
  },
  {
    id: "BK-0239",
    room: "Room 6",
    location: "First floor",
    date: "2026-09-06",
    time: "3:30 PM – 5:30 PM",
    purpose: "Committee Discussion",
    participants: 10,
    status: "cancelled",
    activity: "Cancelled on 4 Sep, 6:40 PM",
  },
]

const statusStyles: Record<BookingStatus, string> = {
  approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  completed: "border-slate-200 bg-slate-100 text-slate-600",
  cancelled: "border-rose-200 bg-rose-50 text-rose-700",
}

const dateFormatter = new Intl.DateTimeFormat("en-MY", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
})

function formatBookingDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00`))
}

function getDateParts(date: string) {
  const value = new Date(`${date}T00:00:00`)
  return {
    day: value.toLocaleDateString("en-MY", { day: "2-digit" }),
    month: value.toLocaleDateString("en-MY", { month: "short" }).toUpperCase(),
  }
}

function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <Badge variant="outline" className={cn("capitalize shadow-none", statusStyles[status])}>
      {status}
    </Badge>
  )
}

export default function UserDashboardPage() {
  useRequireAuth()

  const [bookings, setBookings] = React.useState(initialBookings)
  const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(null)
  const [displayName, setDisplayName] = React.useState("")

  React.useEffect(() => {
    const token = getToken()
    const claims = token ? decodeToken(token) : null
    const name = typeof claims?.name === "string" ? claims.name : ""
    const email = typeof claims?.email === "string" ? claims.email : ""
    setDisplayName(name || email.split("@")[0] || "")
  }, [])

  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "approved" || booking.status === "pending"
  )
  const recentBookings = bookings.filter(
    (booking) => booking.status === "completed" || booking.status === "cancelled"
  )
  const pendingCount = bookings.filter((booking) => booking.status === "pending").length
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const monthlyBookingCount = bookings.filter((booking) => {
    const bookingDate = new Date(`${booking.date}T00:00:00`)
    return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear
  }).length

  const cancelBooking = () => {
    if (!selectedBooking) return

    const cancelledBooking: Booking = {
      ...selectedBooking,
      status: "cancelled",
      activity: "Cancelled just now",
    }

    setBookings((current) =>
      current.map((booking) => (booking.id === cancelledBooking.id ? cancelledBooking : booking))
    )
    setSelectedBooking(cancelledBooking)
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef]">
      <section className="border-b border-[#eadfd5] bg-gradient-to-br from-[#fffaf5] via-[#fffdf9] to-[#f4e8df]">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8 lg:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Parish room booking
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Welcome back{displayName ? `, ${displayName}` : ""}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Your bookings, approvals, and room availability—all in one place.
              </p>
            </div>
            <Button asChild size="lg" className="w-full rounded-full shadow-sm sm:w-fit">
              <Link href="/room-booking">
                <Plus /> Book a room
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-600">Upcoming</p>
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-950">{upcomingBookings.length}</p>
              <p className="mt-1 text-xs text-slate-500">Active room bookings</p>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-600">Pending approval</p>
                <Clock3 className="h-5 w-5 text-amber-600" />
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-950">{pendingCount}</p>
              <p className="mt-1 text-xs text-slate-500">Waiting for parish office</p>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-600">This month</p>
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-950">{monthlyBookingCount}</p>
              <p className="mt-1 text-xs text-slate-500">Requests and completed bookings</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8 lg:py-10">
        <section id="upcoming-bookings" aria-labelledby="upcoming-heading">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Your schedule</p>
              <h2 id="upcoming-heading" className="mt-1 text-2xl font-bold text-slate-950">
                Upcoming bookings
              </h2>
            </div>
            <span className="text-sm text-slate-500">{upcomingBookings.length} bookings</span>
          </div>

          <Card className="overflow-hidden border-[#e8ddd4] bg-white shadow-sm">
            <CardContent className="p-0">
              {upcomingBookings.length === 0 ? (
                <div className="px-6 py-14 text-center">
                  <DoorOpen className="mx-auto h-8 w-8 text-slate-400" />
                  <h3 className="mt-3 font-semibold text-slate-900">No upcoming bookings</h3>
                  <p className="mt-1 text-sm text-slate-500">Choose a room when you are ready.</p>
                </div>
              ) : (
                upcomingBookings.map((booking, index) => {
                  const date = getDateParts(booking.date)
                  return (
                    <article
                      key={booking.id}
                      className={cn(
                        "grid gap-4 p-5 transition-colors hover:bg-[#fffaf6] sm:grid-cols-[72px_minmax(0,1fr)_auto] sm:items-center sm:p-6",
                        index !== upcomingBookings.length - 1 && "border-b border-[#eee5dd]"
                      )}
                    >
                      <div className="flex h-[72px] w-[72px] shrink-0 flex-col items-center justify-center rounded-2xl bg-[#f7ebe5] text-center">
                        <span className="text-xs font-bold tracking-wider text-primary">{date.month}</span>
                        <span className="text-2xl font-bold leading-7 text-slate-950">{date.day}</span>
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-lg font-semibold text-slate-950">{booking.room}</h3>
                          <StatusBadge status={booking.status} />
                        </div>
                        <p className="mt-1 text-sm font-medium text-slate-700">{booking.purpose}</p>
                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock3 className="h-4 w-4" /> {booking.time}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" /> {booking.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Users className="h-4 w-4" /> {booking.participants}
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-[#dfd2c8] sm:w-auto"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        View details <ChevronRight />
                      </Button>
                    </article>
                  )
                })
              )}
            </CardContent>
          </Card>
        </section>

        <aside aria-labelledby="quick-actions-heading">
          <Card className="overflow-hidden border-0 bg-[#7f1d1d] text-white shadow-lg shadow-red-950/10">
            <CardHeader className="pb-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-100">Shortcuts</p>
              <h2 id="quick-actions-heading" className="text-2xl font-bold">
                Quick actions
              </h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/room-booking"
                className="group flex items-center gap-3 rounded-xl bg-white p-4 text-slate-950 transition-transform hover:-translate-y-0.5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-primary">
                  <Plus className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">Book a room</span>
                  <span className="block text-xs text-slate-500">Select a room and date</span>
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/room-booking"
                className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4 transition-colors hover:bg-white/15"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Search className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">Check availability</span>
                  <span className="block text-xs text-red-100">Find a suitable room</span>
                </span>
                <ArrowRight className="h-4 w-4 text-red-100 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#upcoming-bookings"
                className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4 transition-colors hover:bg-white/15"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <CalendarDays className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">My bookings</span>
                  <span className="block text-xs text-red-100">Review booking status</span>
                </span>
                <ArrowRight className="h-4 w-4 text-red-100 transition-transform group-hover:translate-x-1" />
              </Link>
            </CardContent>
          </Card>

          {pendingCount > 0 && (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
              <p className="font-semibold">{pendingCount} booking awaiting approval</p>
              <p className="mt-1 leading-5 text-amber-800">The parish office will update its status after review.</p>
            </div>
          )}
        </aside>

        <section className="lg:col-span-2" aria-labelledby="recent-heading">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Latest updates</p>
            <h2 id="recent-heading" className="mt-1 text-2xl font-bold text-slate-950">
              Recent booking activity
            </h2>
          </div>

          <Card className="overflow-hidden border-[#e8ddd4] bg-white shadow-sm">
            <CardContent className="p-0">
              <div className="hidden grid-cols-[1.4fr_1fr_1.2fr_auto] gap-4 border-b border-[#eee5dd] bg-[#fbf8f5] px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 md:grid">
                <span>Booking</span>
                <span>Date</span>
                <span>Latest activity</span>
                <span>Status</span>
              </div>

              {recentBookings.map((booking, index) => (
                <button
                  key={booking.id}
                  type="button"
                  onClick={() => setSelectedBooking(booking)}
                  className={cn(
                    "grid w-full gap-3 px-5 py-5 text-left transition-colors hover:bg-[#fffaf6] md:grid-cols-[1.4fr_1fr_1.2fr_auto] md:items-center md:gap-4 md:px-6",
                    index !== recentBookings.length - 1 && "border-b border-[#eee5dd]"
                  )}
                >
                  <span>
                    <span className="block font-semibold text-slate-950">{booking.room}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">{booking.purpose} · {booking.id}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-slate-600">
                    <CalendarDays className="h-4 w-4 md:hidden" /> {formatBookingDate(booking.date)}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                    <History className="h-4 w-4 md:hidden" /> {booking.activity}
                  </span>
                  <span className="flex items-center justify-between gap-3 md:justify-end">
                    <StatusBadge status={booking.status} />
                    <ChevronRight className="h-4 w-4 text-slate-400 md:hidden" />
                  </span>
                </button>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>

      <Dialog open={Boolean(selectedBooking)} onOpenChange={(open) => !open && setSelectedBooking(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedBooking && (
            <>
              <DialogHeader>
                <div className="mb-2 flex items-center justify-between gap-3 pr-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {selectedBooking.id}
                  </span>
                  <StatusBadge status={selectedBooking.status} />
                </div>
                <DialogTitle className="text-2xl">{selectedBooking.room}</DialogTitle>
                <DialogDescription>{selectedBooking.purpose}</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 rounded-xl bg-[#faf7f4] p-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Date</p>
                  <p className="mt-1 font-semibold text-slate-900">{formatBookingDate(selectedBooking.date)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Time</p>
                  <p className="mt-1 font-semibold text-slate-900">{selectedBooking.time}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Location</p>
                  <p className="mt-1 font-semibold text-slate-900">{selectedBooking.location}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Participants</p>
                  <p className="mt-1 font-semibold text-slate-900">{selectedBooking.participants} people</p>
                </div>
              </div>

              <p className="text-sm text-slate-500">{selectedBooking.activity}</p>

              <DialogFooter className="gap-2 sm:justify-between">
                {(selectedBooking.status === "approved" || selectedBooking.status === "pending") && (
                  <Button variant="outline" className="text-destructive" onClick={cancelBooking}>
                    Cancel booking
                  </Button>
                )}
                <Button onClick={() => setSelectedBooking(null)} className="sm:ml-auto">
                  Done
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
