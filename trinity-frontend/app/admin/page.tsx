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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useRequireAuth } from "@/hooks/use-auth"

type BookingStatus = "pending" | "approved" | "denied"

type RoomBooking = {
  id: string
  requester: string
  ministry: string
  room: string
  date: string
  time: string
  purpose: string
  status: BookingStatus
}

type Bulletin = {
  id: string
  title: string
  date: string
  description: string
  fileName: string
}

type MassTiming = {
  id: string
  language: string
  time: string
}

type FixedMassSchedule = {
  id: string
  title: "Weekend Mass" | "Weekday Mass"
  timings: MassTiming[]
  remarks: string
}

type SpecialMassSchedule = {
  id: string
  title: string
  timings: MassTiming[]
  remarks: string
}

const initialBookings: RoomBooking[] = [
  {
    id: "RB-001",
    requester: "John Tan",
    ministry: "Youth Ministry",
    room: "Hall 1",
    date: "2026-05-24",
    time: "2:00 PM - 5:00 PM",
    purpose: "Youth fellowship and games preparation",
    status: "pending",
  },
  {
    id: "RB-002",
    requester: "Mary Lee",
    ministry: "Choir",
    room: "Room 3",
    date: "2026-05-25",
    time: "8:00 PM - 10:00 PM",
    purpose: "Choir practice",
    status: "pending",
  },
  {
    id: "RB-003",
    requester: "Peter Wong",
    ministry: "Catechism",
    room: "Room 9",
    date: "2026-05-26",
    time: "9:00 AM - 12:00 PM",
    purpose: "Class session",
    status: "approved",
  },
]

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
      { id: "T-001", language: "English", time: "Sat 5:00 PM" },
      { id: "T-002", language: "Chinese", time: "Sat 8:00 PM | Sun 8:00 AM" },
      { id: "T-003", language: "BM", time: "Sun 11:30 AM" },
    ],
    remarks: "Regular weekend schedule",
  },
  {
    id: "FIXED-002",
    title: "Weekday Mass",
    timings: [
      { id: "T-004", language: "English", time: "Mon - Fri 6:30 AM" },
      { id: "T-005", language: "Chinese", time: "Wed 8:00 PM" },
    ],
    remarks: "Regular weekday schedule",
  },
]

const initialSpecialMassSchedules: SpecialMassSchedule[] = [
  {
    id: "SPECIAL-001",
    title: "Special Mass",
    timings: [
      { id: "T-006", language: "English", time: "No special mass currently" },
    ],
    remarks: "Please contact parish office for special arrangements.",
  },
]

const statusStyle: Record<BookingStatus, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  denied: "border-red-200 bg-red-50 text-red-700",
}

export default function AdminPage() {
  // Protect this page - redirects to login if not authenticated
  useRequireAuth()

  const [bookings, setBookings] = React.useState<RoomBooking[]>(initialBookings)
  const [bulletins, setBulletins] = React.useState<Bulletin[]>(initialBulletins)
  const [fixedMassSchedules, setFixedMassSchedules] = React.useState<FixedMassSchedule[]>(
    initialFixedMassSchedules
  )
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

  function updateBookingStatus(id: string, status: BookingStatus) {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
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
  field: keyof Omit<MassTiming, "id">,
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
                time: "",
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
  field: keyof Omit<MassTiming, "id">,
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
                {bookings.map((booking) => (
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

                          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <CalendarClock className="h-4 w-4" /> {booking.date}
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
                            onClick={() => updateBookingStatus(booking.id, "approved")}
                          >
                            <CheckCircle2 className="h-4 w-4" /> Approve
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            className="gap-2"
                            onClick={() => updateBookingStatus(booking.id, "denied")}
                          >
                            <XCircle className="h-4 w-4" /> Deny
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                      <div className="grid gap-3 px-1 md:grid-cols-[180px_1fr]">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-900">
                          Language
                        </p>

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-900">
                          Mass Timing
                        </p>
                      </div>

                      {schedule.timings.map((timing) => (
                        <div
                          key={timing.id}
                          className="grid gap-3 md:grid-cols-[180px_1fr]"
                        >
                          <div className="rounded-md border border-[#d6cbbd] px-3 py-2 text-sm text-[#5c4033]">
                            {timing.language}
                          </div>

                          <Input
                            value={timing.time}
                            onChange={(event) =>
                              updateFixedMassTiming(
                                schedule.id,
                                timing.id,
                                "time",
                                event.target.value
                              )
                            }
                            className="bg-white"
                          />
                        </div>
                      ))}
                    </div>

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
                              className="grid gap-3 md:grid-cols-[1fr_2fr_auto]"
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
                                  className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm "
                                >
                                  <option value="English">English</option>
                                  <option value="Chinese">Chinese</option>
                                  <option value="BM">BM</option>
                                  <option value="Tamil">Tamil</option>
                                </select>
                              </div>

                              <div className="space-y-2">
                                <Label>Mass timing</Label>
                                <Input
                                  value={timing.time}
                                  onChange={(event) =>
                                    updateSpecialMassTiming(
                                      schedule.id,
                                      timing.id,
                                      "time",
                                      event.target.value
                                    )
                                  }
                                  placeholder="e.g. 24 Dec 10:00 PM"
                                  className="bg-white"
                                />
                              </div>

                              <div className="flex items-end">
                                <Button
                                  variant="destructive"
                                  onClick={() =>
                                    removeSpecialMassTiming(schedule.id, timing.id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Button
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