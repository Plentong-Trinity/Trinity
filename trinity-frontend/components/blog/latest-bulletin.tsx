"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Bulletin = Record<string, unknown>

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
const TITLE_FIELDS = ["title", "name", "subject", "headline"]
const DATE_FIELDS = ["created_at", "published_at", "date"]
const CONTENT_FIELDS = ["content", "body", "message", "description"]

function valueToText(value: unknown): string {
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value)
  }
  if (value === null || value === undefined) return ""
  return JSON.stringify(value) ?? ""
}

function isBulletin(value: unknown): value is Bulletin {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function getFirstText(bulletin: Bulletin, fields: string[]): string | null {
  for (const field of fields) {
    const value = bulletin[field]
    if (typeof value === "string" && value.trim()) return value
  }
  return null
}

export function LatestBulletin() {
  const [bulletin, setBulletin] = useState<Bulletin | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadLatestBulletin() {
      try {
        const response = await fetch(`${API_URL}/api/bulletin/latest`, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        })
        if (response.status === 404) {
          setBulletin(null)
          return
        }
        if (!response.ok) throw new Error(`Bulletin request failed with status ${response.status}`)

        const row: unknown = await response.json()
        if (!isBulletin(row)) {
          throw new Error("Bulletin endpoint returned an invalid response")
        }
        setBulletin(row)
      } catch (requestError) {
        if (controller.signal.aborted) return
        console.error("Failed to load latest bulletin:", requestError)
        setError("Unable to load the latest bulletin.")
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    void loadLatestBulletin()
    return () => controller.abort()
  }, [])

  if (isLoading) {
    return <p className="text-center text-muted-foreground" role="status">Loading latest bulletin...</p>
  }

  if (error) {
    return <p className="text-center text-destructive" role="alert">{error}</p>
  }

  if (!bulletin) return null

  const title = getFirstText(bulletin, TITLE_FIELDS) ?? "Latest Bulletin"
  const date = getFirstText(bulletin, DATE_FIELDS)
  const contentField = CONTENT_FIELDS.find((field) => typeof bulletin[field] === "string" && bulletin[field])
  const content = contentField ? valueToText(bulletin[contentField]) : null
  const otherFields = Object.entries(bulletin).filter(
    ([field, value]) =>
      !TITLE_FIELDS.includes(field) &&
      !DATE_FIELDS.includes(field) &&
      field !== contentField &&
      value !== null &&
      value !== undefined
  )

  return (
    <Card className="mb-10 bg-card/80 border-primary/30 shadow-lg">
      <CardHeader>
        <CardDescription>Latest Bulletin{date ? ` · ${date}` : ""}</CardDescription>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {content && <p className="whitespace-pre-wrap text-muted-foreground">{content}</p>}
        {otherFields.map(([field, value]) => (
          <p key={field} className="text-muted-foreground">
            <span className="font-semibold text-foreground">
              {field.replace(/_/g, " ").replace(/\b\w/g, (character) => character.toUpperCase())}:
            </span>{" "}
            {valueToText(value)}
          </p>
        ))}
      </CardContent>
    </Card>
  )
}
