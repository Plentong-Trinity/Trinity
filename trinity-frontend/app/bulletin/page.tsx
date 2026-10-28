"use client"

import { useEffect, useState } from "react"
import { CalendarDays, Megaphone } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

type Bulletin = Record<string, unknown>

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
const TITLE_FIELDS = ["title", "name", "subject", "headline"]
const DATE_FIELDS = ["created_at", "published_at", "date"]
const CONTENT_FIELDS = ["content", "body", "message", "description"]

function isBulletin(value: unknown): value is Bulletin {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function valueToText(value: unknown): string {
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value)
  }
  if (value === null || value === undefined) return ""
  return JSON.stringify(value) ?? ""
}

function getFirstText(bulletin: Bulletin, fields: string[]): string | null {
  for (const field of fields) {
    const value = bulletin[field]
    if (typeof value === "string" && value.trim()) return value
  }
  return null
}

function formatDate(value: string | null): string | null {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
}

export default function BulletinPage() {
  const [bulletins, setBulletins] = useState<Bulletin[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadBulletins() {
      try {
        const response = await fetch(`${API_URL}/api/bulletin`, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        })
        if (!response.ok) throw new Error(`Bulletin request failed with status ${response.status}`)

        const rows: unknown = await response.json()
        if (!Array.isArray(rows) || !rows.every(isBulletin)) {
          throw new Error("Bulletin endpoint returned an invalid response")
        }
        setBulletins(rows.slice(0, 10))
      } catch (requestError) {
        if (controller.signal.aborted) return
        console.error("Failed to load bulletins:", requestError)
        setError("Unable to load bulletins. Please try again later.")
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    void loadBulletins()
    return () => controller.abort()
  }, [])

  const selectedBulletin = bulletins[selectedIndex]
  const title = selectedBulletin
    ? getFirstText(selectedBulletin, TITLE_FIELDS) ?? `Bulletin ${selectedIndex + 1}`
    : ""
  const date = selectedBulletin ? getFirstText(selectedBulletin, DATE_FIELDS) : null
  const contentField = selectedBulletin
    ? CONTENT_FIELDS.find((field) => typeof selectedBulletin[field] === "string" && selectedBulletin[field])
    : undefined
  const details = selectedBulletin
    ? Object.entries(selectedBulletin).filter(
        ([field, value]) =>
          !TITLE_FIELDS.includes(field) &&
          !DATE_FIELDS.includes(field) &&
          field !== contentField &&
          value !== null &&
          value !== undefined,
      )
    : []

  return (
    <div className="flex min-h-screen flex-col bg-secondary/20">
      <Navbar />
      <main className="flex-grow px-4 pb-12 pt-28">
        <div className="container mx-auto max-w-6xl">
          <header className="mb-8">
            <div className="mb-3 flex items-center gap-3 text-primary">
              <Megaphone aria-hidden="true" className="h-7 w-7" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">Church updates</span>
            </div>
            <h1 className="text-4xl font-bold md:text-5xl">Bulletins</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Browse the latest church bulletins and announcements.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-[16rem_minmax(0,1fr)]">
            <nav
              aria-label="Choose a bulletin"
              role="tablist"
              aria-orientation="vertical"
              className="h-fit rounded-xl border bg-card/80 p-3 shadow-sm"
            >
              <h2 className="px-3 pb-2 pt-1 text-sm font-semibold text-muted-foreground">Recent bulletins</h2>
              {isLoading ? (
                <p className="px-3 py-4 text-sm text-muted-foreground" role="status">Loading bulletins...</p>
              ) : error ? (
                <p className="px-3 py-4 text-sm text-destructive" role="alert">{error}</p>
              ) : bulletins.length === 0 ? (
                <p className="px-3 py-4 text-sm text-muted-foreground">No bulletins are available yet.</p>
              ) : (
                <div className="flex gap-2 overflow-x-auto md:flex-col">
                  {bulletins.map((bulletin, index) => {
                    const bulletinTitle = getFirstText(bulletin, TITLE_FIELDS) ?? `Bulletin ${index + 1}`
                    const bulletinDate = formatDate(getFirstText(bulletin, DATE_FIELDS))
                    const isSelected = selectedIndex === index

                    return (
                      <button
                        key={`${bulletinTitle}-${index}`}
                        id={`bulletin-tab-${index}`}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        aria-controls="bulletin-panel"
                        onClick={() => setSelectedIndex(index)}
                        className={`min-w-48 rounded-lg border px-3 py-3 text-left transition-colors md:min-w-0 ${
                          isSelected
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-transparent hover:border-border hover:bg-secondary/60"
                        }`}
                      >
                        <span className="block truncate text-sm font-semibold">{bulletinTitle}</span>
                        {bulletinDate && <span className="mt-1 block text-xs text-muted-foreground">{bulletinDate}</span>}
                      </button>
                    )
                  })}
                </div>
              )}
            </nav>

            <section
              id="bulletin-panel"
              role="tabpanel"
              aria-labelledby={selectedBulletin ? `bulletin-tab-${selectedIndex}` : undefined}
              tabIndex={0}
              className="min-h-72 rounded-xl border bg-card/80 p-6 shadow-sm md:p-8"
            >
              {error ? (
                <div className="flex h-full min-h-56 items-center justify-center text-center text-muted-foreground">
                  Bulletin details could not be loaded.
                </div>
              ) : isLoading ? (
                <div className="flex h-full min-h-56 items-center justify-center text-muted-foreground" role="status">
                  Loading bulletin...
                </div>
              ) : !selectedBulletin ? (
                <div className="flex h-full min-h-56 items-center justify-center text-center text-muted-foreground">
                  Select a bulletin to view its details.
                </div>
              ) : (
                <article>
                  <div className="mb-6 border-b pb-5">
                    <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
                    {date && (
                      <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays aria-hidden="true" className="h-4 w-4" />
                        {formatDate(date)}
                      </p>
                    )}
                  </div>
                  {contentField && (
                    <p className="whitespace-pre-wrap leading-7 text-muted-foreground">
                      {valueToText(selectedBulletin[contentField])}
                    </p>
                  )}
                  {details.length > 0 && (
                    <dl className="mt-6 space-y-3">
                      {details.map(([field, value]) => (
                        <div key={field} className="border-b pb-3 last:border-0">
                          <dt className="text-sm font-semibold">
                            {field.replace(/_/g, " ").replace(/\b\w/g, (character) => character.toUpperCase())}
                          </dt>
                          <dd className="mt-1 break-words text-sm text-muted-foreground">{valueToText(value)}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </article>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
