"use client"

import * as React from "react"

import {
  listSpecialMass,
  type SpecialMass,
} from "@/lib/special-mass"

function formatMassDate(value: string) {
  const date = new Date(`${value}T00:00:00`)

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function formatMassTime(value: string) {
  const [hours, minutes] = value.split(":")
  const hour = Number(hours)
  const period = hour >= 12 ? "PM" : "AM"
  const displayHour = hour % 12 || 12

  return `${displayHour}:${minutes} ${period}`
}

export function SpecialMassList() {
  const [masses, setMasses] = React.useState<SpecialMass[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const data = await listSpecialMass(controller.signal)

        if (!controller.signal.aborted) {
          setMasses(data)
        }
      } catch {
        if (!controller.signal.aborted) {
          setError("Special Mass schedule is temporarily unavailable.")
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => controller.abort()
  }, [])

  if (loading) {
    return <p className="text-center">Loading special schedule...</p>
  }

  if (error) {
    return <p role="alert" className="text-center">{error}</p>
  }

  if (masses.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No special Mass timings have been published.
      </p>
    )
  }

  return (
    <div className="space-y-3 text-center text-sm text-muted-foreground">
      {masses.map((mass) => (
        <div key={mass.id}>
          {mass.title && (
            <p>
              <strong>{mass.title}</strong>
            </p>
          )}

          <p>
            <strong>{mass.languages.join(" / ")} Mass:</strong>{" "}
            {formatMassDate(mass.mass_date)} {formatMassTime(mass.mass_time)}
          </p>

          {mass.remarks && <p className="text-xs">{mass.remarks}</p>}
        </div>
      ))}
    </div>
  )
}
