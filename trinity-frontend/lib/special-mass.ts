import { getAuthHeader } from "@/lib/auth"

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

export type SpecialMassInput = {
  title: string
  languages: string[]
  mass_date: string
  mass_time: string
  remarks: string
}

export type SpecialMass = SpecialMassInput & {
  id: string
}

async function checkResponse(response: Response) {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))

    throw new Error(
      data.error || `Request failed (${response.status}).`
    )
  }
}

export async function listSpecialMass(
  signal?: AbortSignal
): Promise<SpecialMass[]> {
  const response = await fetch(`${API_URL}/api/special-mass`, {
    cache: "no-store",
    signal,
  })

  await checkResponse(response)
  return response.json()
}

export async function saveSpecialMass(
  input: SpecialMassInput,
  id?: string
): Promise<SpecialMass> {
  const url = id
    ? `${API_URL}/api/special-mass/${encodeURIComponent(id)}`
    : `${API_URL}/api/special-mass`

  const response = await fetch(url, {
    method: id ? "PUT" : "POST",
    headers: {
      ...getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })

  await checkResponse(response)
  return response.json()
}

export async function deleteSpecialMass(id: string): Promise<void> {
  const response = await fetch(
    `${API_URL}/api/special-mass/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: getAuthHeader(),
    }
  )

  await checkResponse(response)
}
