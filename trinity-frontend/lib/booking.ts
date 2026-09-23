import { getToken } from "@/lib/auth"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

export interface BookingPayload {
  name: string
  phone: string
  pax: number
  room: string[]
  department: string
  description: string
  start_on: string
  end_on: string
}

export interface BookingResponse {
  message: string
  booking_id: string
  data: {
    name: string
    phone: string
    pax: number
    room: string[]
    department: string
    description: string
    start_on: string
    end_on: string
  }
}

export type BookingPayloadInput = Omit<BookingPayload, "created_at"> & {
  start_on: string | Date
  end_on: string | Date
}

function toIsoString(value: string | Date): string {
  if (value instanceof Date) {
    return value.toISOString()
  }

  return new Date(value).toISOString()
}

export function normalizeBookingPayload(input: BookingPayloadInput): BookingPayload {
  const roomList = Array.isArray(input.room)
    ? input.room.map((value) => value.trim()).filter(Boolean)
    : [String(input.room || "").trim()].filter(Boolean)

  return {
    name: input.name.trim(),
    phone: input.phone.trim(),
    pax: Number(input.pax),
    room: roomList,
    department: input.department.trim(),
    description: input.description.trim(),
    start_on: toIsoString(input.start_on),
    end_on: toIsoString(input.end_on),
  }
}

export async function createBooking(payload: BookingPayloadInput): Promise<BookingResponse> {
  const normalizedPayload = normalizeBookingPayload(payload)
  const token = getToken()

  if (!token) {
    throw new Error("Authentication required. Please log in again.")
  }

  const response = await fetch(`${API_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(normalizedPayload),
  })


  const data = (await response.json().catch(() => ({}))) as Partial<BookingResponse> & { error?: string }

  if (!response.ok) {
    throw new Error(data.error || "Failed to create booking")
  }

  return data as BookingResponse
}
