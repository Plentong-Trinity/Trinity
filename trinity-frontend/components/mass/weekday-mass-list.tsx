"use client"

import * as React from "react"

import {
  listWeekdayMass,
  type WeekdayMass,
} from "@/lib/weekday-mass"

function formatMassTime(value: string) {
  const [hours, minutes] = value.split(":")
  const hour = Number(hours)
  const period = hour >= 12 ? "PM" : "AM"
  const displayHour = hour % 12 || 12

  return `${displayHour}:${minutes} ${period}`
}

export function WeekdayMassList() {
  const [masses, setMasses] = React.useState<WeekdayMass[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const data = await listWeekdayMass(controller.signal)

        if (!controller.signal.aborted) {
          setMasses(data)
        }
      } catch {
        if (!controller.signal.aborted) {
          setError("Weekday schedule is temporarily unavailable.")
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
    return <p className="text-center">Loading weekday schedule...</p>
  }

  if (error) {
    return <p role="alert" className="text-center">{error}</p>
  }

  if (masses.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No weekday Mass timings have been published.
      </p>
    )
  }

  return (
    <div className="space-y-3 text-center text-sm text-muted-foreground">
      {masses.map((mass) => (
        <div key={mass.id}>
          <p>
            <strong>{mass.languages.join(" / ")} Mass:</strong>{" "}
            {mass.days_of_week.join(", ")} {formatMassTime(mass.mass_time)}
          </p>

          {mass.remarks && (
            <p className="text-xs">{mass.remarks}</p>
          )}
        </div>
      ))}
    </div>
  )
}
