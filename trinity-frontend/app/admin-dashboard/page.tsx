"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft, CalendarCheck, CalendarClock, CheckCircle2, Clock,
  Edit3, FileUp, Megaphone, Plus, Save, Trash2, Upload, XCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useRequireRole } from "@/hooks/use-auth"
import { LoadingPage } from "@/components/loading-page"
import { getAuthHeader } from "@/lib/auth"

type BookingStatus = "pending" | "approved" | "denied"
type BookingFilter = "all" | BookingStatus

type PendingBookingAction = {
  id: string
  status: BookingStatus
  denialReason: string
}

type RoomBooking = {
  id: string
  requester: string
  ministry: string
  room: string
  date: string
  end_date?: string
  time: string
  purpose: string
  participants: number
  status: BookingStatus
  denial_reason?: string
}

type Bulletin = {
  id: string
  title: string
  date: string
  description: string
  fileName: string
}

type SpecialMassTiming = {
  id: string
  language: string
  date: string
  hour: string
  minute: string
  period: string
}

type FixedMassTiming = {
  id: string
  language: string
  day: string
  hour: string
  period: string
}

type FixedMassSchedule = {
  id: string
  title: "Weekend Mass" | "Weekday Mass"
  timings: FixedMassTiming[]
  remarks: string
}

type SpecialMassSchedule = {
  id: string
  title: string
  timings: SpecialMassTiming[]
  remarks: string
}

const initialBulletins: Bulletin[] = [
  {
    id: "BUL-001",
    title: "May Parish Bulletin",
    date: "2026-05-18",
    description: "Weekly announcement and parish updates.",
    fileName: "may-parish-bulletin.pdf",
  },
]

const initialFixedMassSchedules: FixedMassSchedule[] = [
  {
    id: "FIXED-001",
    title: "Weekend Mass",
    timings: [
      { id: "T-001", language: "English", day: "Saturday", hour: "5", period: "PM" },
      { id: "T-002", language: "Chinese", day: "Saturday", hour: "8", period: "PM" },
      { id: "T-003", language: "Chinese", day: "Sunday", hour: "8", period: "AM" },
      { id: "T-004", language: "BM", day: "Sunday", hour: "11", period: "AM" },
    ],
    remarks: "Regular weekend schedule",
  },
  {
    id: "FIXED-002",
    title: "Weekday Mass",
    timings: [
      { id: "T-005", language: "English", day: "Monday", hour: "6", period: "AM" },
      { id: "T-006", language: "English", day: "Tuesday", hour: "6", period: "AM" },
      { id: "T-007", language: "English", day: "Wednesday", hour: "6", period: "AM" },
      { id: "T-008", language: "English", day: "Thursday", hour: "6", period: "AM" },
      { id: "T-009", language: "English", day: "Friday", hour: "6", period: "AM" },
      { id: "T-010", language: "Chinese", day: "Wednesday", hour: "8", period: "PM" },
    ],
    remarks: "Regular weekday schedule",
  },
]

const WEEKDAY_OPTIONS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const WEEKEND_OPTIONS = ["Saturday", "Sunday"]
const MASS_HOUR_OPTIONS = Array.from({ length: 12 }, (_, index) => String(index + 1))
const MASS_MINUTE_OPTIONS = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, "0"))
const MASS_PERIOD_OPTIONS = ["AM", "PM"]
const MASS_LANGUAGE_OPTIONS = ["English", "Chinese", "BM", "Tamil"]

const initialSpecialMassSchedules: SpecialMassSchedule[] = [
  {
    id: "SPECIAL-001",
    title: "Special Mass",
    timings: [],
    remarks: "Please contact parish office for special arrangements.",
  },
]

const statusStyle: Record<BookingStatus, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  denied: "border-red-200 bg-red-50 text-red-700",
}

export default function AdminPage() {
  // Protect this page - only allow admin role
  const isCheckingAuth = useRequireRole("admin")

  const [bookings, setBookings] = React.useState<RoomBooking[]>([])
  const [bookingsLoading, setBookingsLoading] = React.useState(true)
  const [bookingError, setBookingError] = React.useState<string | null>(null)
  const [bulletins, setBulletins] = React.useState<Bulletin[]>(initialBulletins)
  const [fixedMassSchedules, setFixedMassSchedules] = React.useState<FixedMassSchedule[]>(
    initialFixedMassSchedules
  )
  const [pendingBookingAction, setPendingBookingAction] = React.useState<PendingBookingAction | null>(null)
  const [selectedBooking, setSelectedBooking] = React.useState<RoomBooking | null>(null)
  const [bookingFilter, setBookingFilter] = React.useState<BookingFilter>("all")
  const [bookingPage, setBookingPage] = React.useState(1)
  const [specialMassSchedules, setSpecialMassSchedules] = React.useState<SpecialMassSchedule[]>(
    initialSpecialMassSchedules
  )
  const [bulletinForm, setBulletinForm] = React.useState({
    title: "",
    date: "",
    description: "",
    fileName: "",
  })

  const pendingCount = bookings.filter((booking) => booking.status === "pending").length
  const approvedCount = bookings.filter((booking) => booking.status === "approved").length
  const filteredBookings = bookingFilter === "all"
    ? bookings
    : bookings.filter((booking) => booking.status === bookingFilter)
  const bookingsPerPage = 10
  const bookingPageCount = Math.max(1, Math.ceil(filteredBookings.length / bookingsPerPage))
  const visibleBookings = filteredBookings.slice(
    (bookingPage - 1) * bookingsPerPage,
    bookingPage * bookingsPerPage
  )
  const pendingBooking = pendingBookingAction
    ? bookings.find((booking) => booking.id === pendingBookingAction.id)
    : null

  React.useEffect(() => {
    setBookingPage((currentPage) => Math.min(currentPage, bookingPageCount))
  }, [bookingPageCount])

  React.useEffect(() => {
    const controller = new AbortController()
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

    async function loadBookings() {
      try {
        const response = await fetch(`${apiUrl}/api/room-bookings`, {
          headers: getAuthHeader(),
          signal: controller.signal,
        })
        if (!response.ok) throw new Error("Could not load bookings from the database.")
        setBookings(await response.json() as RoomBooking[])
        setBookingError(null)
      } catch (error) {
        if (!controller.signal.aborted) {
          setBookingError(error instanceof Error ? error.message : "Could not load bookings.")
        }
      } finally {
        if (!controller.signal.aborted) setBookingsLoading(false)
      }
    }

    void loadBookings()
    return () => controller.abort()
  }, [])

  if (isCheckingAuth === "denied") {
    return <LoadingPage accessDenied />
  }

  function changeBookingFilter(filter: BookingFilter) {
    setBookingFilter(filter)
    setBookingPage(1)
  }

  function requestBookingStatusChange(id: string, status: BookingStatus) {
    setSelectedBooking(null)
    setPendingBookingAction({ id, status, denialReason: "" })
  }

  async function confirmBookingStatusChange() {
    if (!pendingBookingAction) return
    if (pendingBookingAction.status === "denied" && !pendingBookingAction.denialReason.trim()) return

    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    try {
      const response = await fetch(`${apiUrl}/api/room-bookings/${pendingBookingAction.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify({
          status: pendingBookingAction.status,
          denial_reason: pendingBookingAction.denialReason.trim(),
        }),
      })
      if (!response.ok) throw new Error("Could not update this booking.")
      const updatedBooking = await response.json() as RoomBooking
      setBookings((current) => current.map((booking) =>
        booking.id === updatedBooking.id ? updatedBooking : booking
      ))
      setBookingError(null)
      setPendingBookingAction(null)
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : "Could not update this booking.")
    }
  }

  function updateDenialReason(reason: string) {
    setPendingBookingAction((current) =>
      current ? { ...current, denialReason: reason } : current
    )
  }

  function handleBulletinUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!bulletinForm.title || !bulletinForm.date || !bulletinForm.fileName) return

    const newBulletin: Bulletin = {
      id: `BUL-${String(bulletins.length + 1).padStart(3, "0")}`,
      ...bulletinForm,
    }

    setBulletins((current) => [newBulletin, ...current])
    setBulletinForm({ title: "", date: "", description: "", fileName: "" })
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setBulletinForm((current) => ({ ...current, fileName: file.name }))
  }

  function updateFixedMassTiming(
  scheduleId: string,
  timingId: string,
  field: keyof Pick<FixedMassTiming, "language" | "day" | "hour" | "period">,
  value: string
) {
  setFixedMassSchedules((current) =>
    current.map((schedule) =>
      schedule.id === scheduleId
        ? {
            ...schedule,
            timings: schedule.timings.map((timing) =>
              timing.id === timingId ? { ...timing, [field]: value } : timing
            ),
          }
        : schedule
    )
  )
}

function addFixedMassTiming(scheduleId: string) {
  setFixedMassSchedules((current) =>
    current.map((schedule) =>
      schedule.id === scheduleId
        ? {
            ...schedule,
            timings: [
              ...schedule.timings,
              {
                id: `T-${Date.now()}`,
                language: "English",
                day: schedule.title === "Weekend Mass" ? WEEKEND_OPTIONS[0] : WEEKDAY_OPTIONS[0],
                hour: "1",
                period: "AM",
              },
            ],
          }
        : schedule
    )
  )
}

function removeFixedMassTiming(scheduleId: string, timingId: string) {
  setFixedMassSchedules((current) =>
    current.map((schedule) =>
      schedule.id === scheduleId
        ? {
            ...schedule,
            timings: schedule.timings.filter((timing) => timing.id !== timingId),
          }
        : schedule
    )
  )
}

function updateFixedMassRemarks(scheduleId: string, value: string) {
  setFixedMassSchedules((current) =>
    current.map((schedule) =>
      schedule.id === scheduleId ? { ...schedule, remarks: value } : schedule
    )
  )
}

function addSpecialMassSchedule() {
  setSpecialMassSchedules((current) => [
    ...current,
    {
      id: `SPECIAL-${Date.now()}`,
      title: "New Special Mass",
      timings: [],
      remarks: "",
    },
  ])
}

function updateSpecialMassSchedule(
  scheduleId: string,
  field: keyof Omit<SpecialMassSchedule, "id" | "timings">,
  value: string
) {
  setSpecialMassSchedules((current) =>
    current.map((schedule) =>
      schedule.id === scheduleId ? { ...schedule, [field]: value } : schedule
    )
  )
}

function addSpecialMassTiming(scheduleId: string) {
  setSpecialMassSchedules((current) =>
    current.map((schedule) =>
      schedule.id === scheduleId
        ? {
            ...schedule,
            timings: [
              ...schedule.timings,
              {
                id: `T-${Date.now()}`,
                language: "English",
                date: "",
                hour: "1",
                minute: "00",
                period: "AM",
              },
            ],
          }
        : schedule
    )
  )
}

function updateSpecialMassTiming(
  scheduleId: string,
  timingId: string,
  field: keyof Omit<SpecialMassTiming, "id">,
  value: string
) {
  setSpecialMassSchedules((current) =>
    current.map((schedule) =>
      schedule.id === scheduleId
        ? {
            ...schedule,
            timings: schedule.timings.map((timing) =>
              timing.id === timingId ? { ...timing, [field]: value } : timing
            ),
          }
        : schedule
    )
  )
}

function removeSpecialMassTiming(scheduleId: string, timingId: string) {
  setSpecialMassSchedules((current) =>
    current.map((schedule) =>
      schedule.id === scheduleId
        ? {
            ...schedule,
            timings: schedule.timings.filter((timing) => timing.id !== timingId),
          }
        : schedule
    )
  )
}

function removeSpecialMassSchedule(scheduleId: string) {
  setSpecialMassSchedules((current) =>
    current.filter((schedule) => schedule.id !== scheduleId)
  )
}

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Button asChild variant="ghost" className="mb-3 gap-2 px-0">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" /> Back to website
              </Link>
            </Button>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-slate-600">
              Manage room bookings, parish bulletins, and mass schedules.
            </p>
          </div>

          <Button className="gap-2">
            <Save className="h-4 w-4" /> Save Changes
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <SummaryCard icon={CalendarClock} title="Pending bookings" value={pendingCount} description="Need admin approval" />
          <SummaryCard icon={CalendarCheck} title="Approved bookings" value={approvedCount} description="Confirmed room usage" />
          <SummaryCard icon={Megaphone} title="Uploaded bulletins" value={bulletins.length} description="Published announcements" />
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:w-[520px]">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="bulletins">Bulletins</TabsTrigger>
            <TabsTrigger value="mass">Mass Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Room booking approvals</CardTitle>
                <CardDescription>
                  Approve or deny room requests submitted by church members.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {bookingError && (
                  <p role="alert" className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {bookingError}
                  </p>
                )}
                {bookingsLoading && (
                  <p className="py-4 text-center text-sm text-slate-500">Loading bookings...</p>
                )}
                {visibleBookings.map((booking) => (
                  <Card key={booking.id} className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-slate-900">{booking.room}</h3>
                            <Badge variant="outline" className={statusStyle[booking.status]}>
                              {booking.status}
                            </Badge>
                          </div>

                          <p className="text-sm text-slate-600">
                            {booking.requester} • {booking.ministry}
                          </p>
                          <p className="text-sm text-slate-600">{booking.room} · {booking.participants} people</p>

                          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <CalendarClock className="h-4 w-4" /> {booking.date}{booking.end_date ? ` - ${booking.end_date}` : ""}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" /> {booking.time}
                            </span>
                          </div>

                          <p className="text-sm text-slate-700">{booking.purpose}</p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => requestBookingStatusChange(booking.id, "approved")}
                          >
                            <CheckCircle2 className="h-4 w-4" /> Approve
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            className="gap-2"
                            onClick={() => requestBookingStatusChange(booking.id, "approved")}
                          >
                            <XCircle className="h-4 w-4" /> Deny
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {!bookingsLoading && !bookingError && visibleBookings.length === 0 && (
                  <p className="rounded-md border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                    No bookings match this filter.
                  </p>
                )}
                {filteredBookings.length > bookingsPerPage && (
                  <div className="flex items-center justify-between border-t pt-4">
                    <p className="text-sm text-slate-500">
                      Page {bookingPage} of {bookingPageCount}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={bookingPage === 1}
                        onClick={() => setBookingPage((page) => Math.max(1, page - 1))}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={bookingPage === bookingPageCount}
                        onClick={() => setBookingPage((page) => Math.min(bookingPageCount, page + 1))}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bulletins" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Upload bulletin</CardTitle>
                  <CardDescription>Add a new bulletin PDF or image for members to view.</CardDescription>
                </CardHeader>

                <CardContent>
                  <form className="space-y-4" onSubmit={handleBulletinUpload}>
                    <div className="space-y-2">
                      <Label htmlFor="bulletin-title">Title</Label>
                      <Input
                        id="bulletin-title"
                        value={bulletinForm.title}
                        onChange={(event) =>
                          setBulletinForm((current) => ({ ...current, title: event.target.value }))
                        }
                        placeholder="e.g. Pentecost Sunday Bulletin"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bulletin-date">Date</Label>
                      <Input
                        id="bulletin-date"
                        type="date"
                        value={bulletinForm.date}
                        onChange={(event) =>
                          setBulletinForm((current) => ({ ...current, date: event.target.value }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bulletin-description">Description</Label>
                      <Textarea
                        id="bulletin-description"
                        value={bulletinForm.description}
                        onChange={(event) =>
                          setBulletinForm((current) => ({ ...current, description: event.target.value }))
                        }
                        placeholder="Short announcement summary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bulletin-file">Bulletin file</Label>
                      <Input
                        id="bulletin-file"
                        type="file"
                        accept=".pdf,image/*"
                        onChange={handleFileSelect}
                      />
                      {bulletinForm.fileName && (
                        <p className="text-sm text-slate-500">Selected: {bulletinForm.fileName}</p>
                      )}
                    </div>

                    <Button type="submit" className="w-full gap-2">
                      <Upload className="h-4 w-4" /> Upload Bulletin
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Uploaded bulletins</CardTitle>
                  <CardDescription>Recently uploaded bulletin files.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  {bulletins.map((bulletin) => (
                    <div key={bulletin.id} className="rounded-xl border bg-white p-4">
                      <h3 className="font-semibold text-slate-900">{bulletin.title}</h3>
                      <p className="text-sm text-slate-500">{bulletin.date}</p>
                      <p className="mt-2 text-sm text-slate-600">{bulletin.description}</p>
                      <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                        <FileUp className="h-4 w-4" /> {bulletin.fileName}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mass" className="space-y-4">
            <Card>
              <CardHeader>
                  <CardTitle>Edit mass schedule</CardTitle>
                  <CardDescription>
                    Update the schedule shown on the public landing page.
                  </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {fixedMassSchedules.map((schedule) => (
                <Card key={schedule.id} className="border-slate-200">
                  <CardContent className="space-y-4 p-4">
                    <div className="border-b pb-2">
                      <h3 className="text-xl font-semibold text-slate-900">
                        {schedule.title}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div className="hidden gap-3 px-1 md:grid md:grid-cols-[180px_1fr_1fr_1fr_auto]">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-900">
                          Language
                        </p>

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-900">
                          Day
                        </p>

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-900">
                          Time
                        </p>

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-900">
                          AM / PM
                        </p>

                        <span className="w-10" aria-hidden="true" />
                      </div>

                      {schedule.timings.map((timing) => (
                        <div
                          key={timing.id}
                          className="grid gap-3 rounded-lg border border-slate-200 p-3 md:grid-cols-[180px_1fr_1fr_1fr_auto] md:border-0 md:p-0"
                        >
                          <div>
                            <Label className="mb-1.5 block md:hidden">Language</Label>
                            <select
                              aria-label="Mass language"
                              value={timing.language}
                              onChange={(event) =>
                                updateFixedMassTiming(
                                  schedule.id,
                                  timing.id,
                                  "language",
                                  event.target.value
                                )
                              }
                              className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm"
                            >
                              {MASS_LANGUAGE_OPTIONS.map((language) => (
                                <option key={language} value={language}>
                                  {language}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <Label className="mb-1.5 block md:hidden">Day</Label>
                            <select
                              aria-label={`${timing.language} Mass day`}
                              value={timing.day}
                              onChange={(event) =>
                                updateFixedMassTiming(
                                  schedule.id,
                                  timing.id,
                                  "day",
                                  event.target.value
                                )
                              }
                              className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm"
                            >
                              {(schedule.title === "Weekend Mass"
                                ? WEEKEND_OPTIONS
                                : WEEKDAY_OPTIONS
                              ).map((day) => (
                                <option key={day} value={day}>
                                  {day}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <Label className="mb-1.5 block md:hidden">Time</Label>
                            <select
                              aria-label={`${timing.language} Mass hour`}
                              value={timing.hour}
                              onChange={(event) =>
                                updateFixedMassTiming(
                                  schedule.id,
                                  timing.id,
                                  "hour",
                                  event.target.value
                                )
                              }
                              className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm"
                            >
                              {MASS_HOUR_OPTIONS.map((hour) => (
                                <option key={hour} value={hour}>
                                  {hour}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <Label className="mb-1.5 block md:hidden">AM / PM</Label>
                            <select
                              aria-label={`${timing.language} Mass period`}
                              value={timing.period}
                              onChange={(event) =>
                                updateFixedMassTiming(
                                  schedule.id,
                                  timing.id,
                                  "period",
                                  event.target.value
                                )
                              }
                              className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm"
                            >
                              {MASS_PERIOD_OPTIONS.map((period) => (
                                <option key={period} value={period}>
                                  {period}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex items-end">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              aria-label={`Remove ${timing.language} Mass`}
                              onClick={() => removeFixedMassTiming(schedule.id, timing.id)}
                              className="w-full md:w-10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2"
                      onClick={() => addFixedMassTiming(schedule.id)}
                    >
                      <Plus className="h-4 w-4" /> Add Mass
                    </Button>

                    <div className="space-y-2">
                      <Label>Remarks</Label>
                      <Input
                        value={schedule.remarks}
                        onChange={(event) =>
                          updateFixedMassRemarks(schedule.id, event.target.value)
                        }
                        className="bg-white"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}

                <div className="border-t pt-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h3 className="mb-4 text-lg font-semibold">Special Mass</h3>
                    <div>
                      <Button onClick={addSpecialMassSchedule} className="gap-2">
                        <Plus className="h-4 w-4" /> Add Special Mass
                      </Button>
                    </div>
                  </div>

                  {specialMassSchedules.map((schedule) => (
                    <Card key={schedule.id} className="mb-4 border-slate-200">
                      <CardContent className="space-y-4 p-4">
                        <div className="space-y-2">
                          <Label>Special mass title</Label>
                          <Input
                            value={schedule.title}
                            onChange={(event) =>
                              updateSpecialMassSchedule(
                                schedule.id,
                                "title",
                                event.target.value
                              )
                            }
                            placeholder="e.g. Christmas Eve Mass"
                            className="bg-white"
                          />
                        </div>

                        <div className="space-y-3">
                          {schedule.timings.map((timing) => (
                            <div
                              key={timing.id}
                              className="grid gap-3 rounded-lg border border-slate-200 p-3 md:grid-cols-[1fr_1.3fr_0.75fr_0.75fr_0.75fr_auto] md:border-0 md:p-0"
                            >
                              <div className="space-y-2">
                                <Label>Language</Label>
                                <select
                                  value={timing.language}
                                  onChange={(event) =>
                                    updateSpecialMassTiming(
                                      schedule.id,
                                      timing.id,
                                      "language",
                                      event.target.value
                                    )
                                  }
                                  className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm"
                                >
                                  {MASS_LANGUAGE_OPTIONS.map((language) => (
                                    <option key={language} value={language}>
                                      {language}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="space-y-2">
                                <Label>Date</Label>
                                <Input
                                  type="date"
                                  value={timing.date}
                                  onChange={(event) =>
                                    updateSpecialMassTiming(
                                      schedule.id,
                                      timing.id,
                                      "date",
                                      event.target.value
                                    )
                                  }
                                  className="bg-white"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Hour</Label>
                                <select
                                  value={timing.hour}
                                  onChange={(event) =>
                                    updateSpecialMassTiming(
                                      schedule.id,
                                      timing.id,
                                      "hour",
                                      event.target.value
                                    )
                                  }
                                  className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm"
                                >
                                  {MASS_HOUR_OPTIONS.map((hour) => (
                                    <option key={hour} value={hour}>
                                      {hour}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="space-y-2">
                                <Label>Minute</Label>
                                <select
                                  value={timing.minute}
                                  onChange={(event) =>
                                    updateSpecialMassTiming(
                                      schedule.id,
                                      timing.id,
                                      "minute",
                                      event.target.value
                                    )
                                  }
                                  className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm"
                                >
                                  {MASS_MINUTE_OPTIONS.map((minute) => (
                                    <option key={minute} value={minute}>
                                      {minute}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="space-y-2">
                                <Label>AM / PM</Label>
                                <select
                                  value={timing.period}
                                  onChange={(event) =>
                                    updateSpecialMassTiming(
                                      schedule.id,
                                      timing.id,
                                      "period",
                                      event.target.value
                                    )
                                  }
                                  className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm"
                                >
                                  {MASS_PERIOD_OPTIONS.map((period) => (
                                    <option key={period} value={period}>
                                      {period}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="flex items-end">
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  aria-label={`Remove ${timing.language} special Mass timing`}
                                  onClick={() =>
                                    removeSpecialMassTiming(schedule.id, timing.id)
                                  }
                                  className="w-full md:w-10"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          className="gap-2"
                          onClick={() => addSpecialMassTiming(schedule.id)}
                        >
                          <Plus className="h-4 w-4" /> Add Mass Timing
                        </Button>

                        <div className="space-y-2">
                          <Label>Remarks</Label>
                          <Input
                            value={schedule.remarks}
                            onChange={(event) =>
                              updateSpecialMassSchedule(
                                schedule.id,
                                "remarks",
                                event.target.value
                              )
                            }
                            className="bg-white"
                          />
                        </div>

                        <Button
                          variant="destructive"
                          className="gap-2"
                          onClick={() => removeSpecialMassSchedule(schedule.id)}
                        >
                          <Trash2 className="h-4 w-4" /> Remove Special Mass
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog
        open={selectedBooking !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedBooking(null)
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedBooking?.room} booking details
            </DialogTitle>
            <DialogDescription>
              Review the request before changing its approval status.
            </DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <Badge variant="outline" className={statusStyle[selectedBooking.status]}>
                  {selectedBooking.status}
                </Badge>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="font-medium text-slate-900">Requester</p>
                  <p className="text-slate-600">{selectedBooking.requester}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Ministry</p>
                  <p className="text-slate-600">{selectedBooking.ministry}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Room</p>
                  <p className="text-slate-600">{selectedBooking.room}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Date and time</p>
                  <p className="text-slate-600">{selectedBooking.date} • {selectedBooking.time}</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-slate-900">Purpose</p>
                <p className="mt-1 text-slate-600">{selectedBooking.purpose}</p>
              </div>
              {selectedBooking.status === "denied" && selectedBooking.denial_reason && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-red-800">
                  <p className="font-semibold">Reason for denial</p>
                  <p className="mt-1">{selectedBooking.denial_reason}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedBooking(null)}>
              Close
            </Button>
            {selectedBooking?.status !== "approved" && (
              <Button
                className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                onClick={() => selectedBooking && requestBookingStatusChange(selectedBooking.id, "approved")}
              >
                <CheckCircle2 className="h-4 w-4" />
                Approve
              </Button>
            )}
            {selectedBooking?.status !== "denied" && (
              <Button
                variant="destructive"
                className="gap-2"
                onClick={() => selectedBooking && requestBookingStatusChange(selectedBooking.id, "denied")}
              >
                <XCircle className="h-4 w-4" />
                Deny
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={pendingBookingAction !== null}
        onOpenChange={(open) => {
          if (!open) setPendingBookingAction(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingBookingAction?.status === "approved"
                ? "Approve this booking?"
                : "Deny this booking?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingBookingAction?.status === "approved"
                ? "This will mark the room booking as approved."
                : "This will mark the room booking as denied."} This action can be changed later.
            </AlertDialogDescription>
              {pendingBooking && (
                <div className="mt-4 space-y-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm">
                  <p><span className="font-semibold">Requester:</span> {pendingBooking.requester}</p>
                  <p><span className="font-semibold">Ministry:</span> {pendingBooking.ministry}</p>
                  <p><span className="font-semibold">Room:</span> {pendingBooking.room}</p>
                  <p><span className="font-semibold">Date and time:</span> {pendingBooking.date} • {pendingBooking.time}</p>
                  <p><span className="font-semibold">Purpose:</span> {pendingBooking.purpose}</p>
                  {pendingBooking.status === "denied" && pendingBooking.denial_reason && (
                    <p className="text-red-700"><span className="font-semibold">Current denial reason:</span> {pendingBooking.denial_reason}</p>
                  )}
                </div>
              )}
            {pendingBookingAction?.status === "denied" && (
              <div className="mt-4 space-y-2">
                <Label htmlFor="denial-reason">Reason for denial</Label>
                <Textarea
                  id="denial-reason"
                  className="font-sans normal-case resize-none"
                  value={pendingBookingAction.denialReason}
                  onChange={(event) => updateDenialReason(event.target.value)}
                  placeholder="Explain why this booking is being denied..."
                  required
                  rows={4}
                />
              </div>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmBookingStatusChange}
              className={
                pendingBookingAction?.status === "denied"
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }
              disabled={
                pendingBookingAction?.status === "denied" &&
                !pendingBookingAction.denialReason.trim()
              }
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}

function SummaryCard({
  icon: Icon,
  title,
  value,
  description,
}: {
  icon: React.ElementType
  title: string
  value: number
  description: string
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
