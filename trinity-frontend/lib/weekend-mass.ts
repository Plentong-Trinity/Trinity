import { getAuthHeader } from "@/lib/auth"
import { z } from "zod"

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

export type WeekendMassInput = {
  languages: string[]
  days_of_week: string[]
  mass_time: string
  remarks: string
}

export type WeekendMass = WeekendMassInput & {
  id: string
}

const massSchema = z.object({
  id: z.string(),
  languages: z.array(z.enum(["English", "Chinese", "BM", "Tamil"])).length(1),
  days_of_week: z.array(z.enum(["Saturday", "Sunday"])).length(1),
  mass_time: z.string(),
  remarks: z.string(),
})

const invalidResponseMessage =
  "Could not load weekend Mass data. Each Mass must have exactly one language and exactly one Saturday or Sunday in days_of_week. Check that the backend and database migrations are up to date, then refresh."

async function checkResponse(response: Response) {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))

    throw new Error(
      data.error || `Request failed (${response.status}).`
    )
  }
}

export async function listWeekendMass(
  signal?: AbortSignal
): Promise<WeekendMass[]> {
  const response = await fetch(`${API_URL}/api/weekend-mass`, {
    cache: "no-store",
    signal,
  })

  await checkResponse(response)
  const result = z.array(massSchema).safeParse(await response.json())
  if (!result.success) throw new Error(invalidResponseMessage)
  return result.data
}

export async function saveWeekendMass(
  input: WeekendMassInput,
  id?: string
): Promise<WeekendMass> {
  const url = id
    ? `${API_URL}/api/weekend-mass/${encodeURIComponent(id)}`
    : `${API_URL}/api/weekend-mass`

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

export async function deleteWeekendMass(id: string): Promise<void> {
  const response = await fetch(
    `${API_URL}/api/weekend-mass/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: getAuthHeader(),
    }
  )

  await checkResponse(response)
}
