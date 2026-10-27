import { getAuthHeader } from "@/lib/auth"
import { z } from "zod"

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

export const WEEKDAY_OPTIONS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const

export type WeekdayMassInput = {
  languages: string[]
  days_of_week: string[]
  mass_time: string
  remarks: string
}

export type WeekdayMass = WeekdayMassInput & {
  id: string
}

const massSchema = z.object({
  id: z.string(),
  languages: z.array(z.enum(["English", "Chinese", "BM", "Tamil"])).length(1),
  days_of_week: z.array(z.enum(WEEKDAY_OPTIONS)).min(1)
    .refine((days) => new Set(days).size === days.length),
  mass_time: z.string(),
  remarks: z.string(),
})

const invalidResponseMessage =
  "Could not load weekday Mass data. Each Mass needs one language and at least one Monday–Friday day in days_of_week. Check that the backend and database migrations are up to date, then refresh."

async function checkResponse(response: Response) {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))

    throw new Error(
      data.error || `Request failed (${response.status}).`
    )
  }
}

export async function listWeekdayMass(
  signal?: AbortSignal
): Promise<WeekdayMass[]> {
  const response = await fetch(`${API_URL}/api/weekday-mass`, {
    cache: "no-store",
    signal,
  })

  await checkResponse(response)
  const result = z.array(massSchema).safeParse(await response.json())
  if (!result.success) throw new Error(invalidResponseMessage)
  return result.data
}

export async function saveWeekdayMass(
  input: WeekdayMassInput,
  id?: string
): Promise<WeekdayMass> {
  const url = id
    ? `${API_URL}/api/weekday-mass/${encodeURIComponent(id)}`
    : `${API_URL}/api/weekday-mass`

  const response = await fetch(url, {
    method: id ? "PUT" : "POST",
    headers: {
      ...getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })

  await checkResponse(response)
  const result = massSchema.safeParse(await response.json())
  if (!result.success) {
    throw new Error("The server accepted the save but returned incompatible Mass data. Refresh before retrying to avoid duplicate entries.")
  }
  return result.data
}

export async function deleteWeekdayMass(id: string): Promise<void> {
  const response = await fetch(
    `${API_URL}/api/weekday-mass/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: getAuthHeader(),
    }
  )

  await checkResponse(response)
}
