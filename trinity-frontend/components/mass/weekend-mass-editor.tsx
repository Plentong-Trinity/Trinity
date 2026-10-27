"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMassEditing } from "@/components/mass/mass-editing-context"
import {
  listWeekendMass,
  saveWeekendMass,
  deleteWeekendMass,
  type WeekendMass,
  type WeekendMassInput,
} from "@/lib/weekend-mass"

type DraftMass = WeekendMassInput & {
  localId: string
  id?: string
  dirty: boolean
}

function toDraft(mass: WeekendMass): DraftMass {
  return {
    ...mass,
    localId: mass.id,
    dirty: false,
  }
}

export function WeekendMassEditor() {
  const { activeMass, startEditing, finishEditing } = useMassEditing()
  const originalRow = React.useRef<DraftMass | null>(null)
  const rowKey = (localId: string) => `weekend:${localId}`
  const isEditing = (row: DraftMass) => activeMass === rowKey(row.localId)
  const [rows, setRows] = React.useState<DraftMass[]>([])
  const [loading, setLoading] = React.useState(true)
  const [loaded, setLoaded] = React.useState(false)
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [message, setMessage] = React.useState<string | null>(null)

  React.useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const masses = await listWeekendMass(controller.signal)

        if (!controller.signal.aborted) {
          setRows(masses.map(toDraft))
          setLoaded(true)
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(
            error instanceof Error
              ? error.message
              : "Could not load weekend Masses."
          )
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

  function addRow() {
    const localId = crypto.randomUUID()
    if (busy || !loaded || !startEditing(rowKey(localId))) return
    originalRow.current = null
    setError(null)
    setMessage(null)

    setRows((current) => [
      ...current,
      {
        localId,
        languages: ["English"],
        days_of_week: ["Saturday"],
        mass_time: "17:00",
        remarks: "",
        dirty: true,
      },
    ])
  }

  function editRow(row: DraftMass) {
    if (busy || !startEditing(rowKey(row.localId))) return
    originalRow.current = { ...row, languages: [...row.languages], days_of_week: [...row.days_of_week] }
    setError(null)
    setMessage(null)
  }

  function cancelEdit(row: DraftMass) {
    if (busy || !isEditing(row)) return
    const original = originalRow.current
    setRows((current) => original
      ? current.map((item) => item.localId === row.localId ? original : item)
      : current.filter((item) => item.localId !== row.localId)
    )
    originalRow.current = null
    finishEditing(rowKey(row.localId))
    setError(null)
    setMessage(null)
  }

  function updateRow(
    localId: string,
    field: Exclude<keyof WeekendMassInput, "languages" | "days_of_week">,
    value: string
  ) {
    setMessage(null)

    setRows((current) =>
      current.map((row) =>
        row.localId === localId
          ? { ...row, [field]: value, dirty: true }
          : row
      )
    )
  }

  async function saveRow(row: DraftMass) {
    if (busy || !isEditing(row)) return

    if (row.languages.length !== 1) {
      setError("Select exactly one language for this Mass.")
      return
    }

    if (row.days_of_week.length !== 1 || !["Saturday", "Sunday"].includes(row.days_of_week[0])) {
      setError("Select exactly one day: Saturday or Sunday.")
      return
    }

    setBusy(true)
    setError(null)
    setMessage(null)

    try {
      const saved = await saveWeekendMass(
        {
          languages: row.languages,
          days_of_week: row.days_of_week,
          mass_time: row.mass_time,
          remarks: row.remarks,
        },
        row.id
      )

      setRows((current) =>
        current.map((item) =>
          item.localId === row.localId
            ? {
                ...saved,
                localId: row.localId,
                dirty: false,
              }
            : item
        )
      )

      originalRow.current = null
      finishEditing(rowKey(row.localId))
      setMessage("Mass saved.")
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not save Mass."
      )
    } finally {
      setBusy(false)
    }
  }

  async function removeRow(row: DraftMass) {
    if (busy || activeMass !== null) return

    // An unsaved draft exists only in the browser.
    if (!row.id) {
      setRows((current) =>
        current.filter((item) => item.localId !== row.localId)
      )
      setMessage(null)
      return
    }

    if (
      !window.confirm(
        "Delete this Mass from the saved schedule? This takes effect immediately."
      )
    ) {
      return
    }

    if (!startEditing(rowKey(row.localId))) return
    setBusy(true)
    setError(null)
    setMessage(null)

    try {
      await deleteWeekendMass(row.id)

      setRows((current) =>
        current.filter((item) => item.localId !== row.localId)
      )

      setMessage("Mass deleted.")
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not delete Mass."
      )
    } finally {
      finishEditing(rowKey(row.localId))
      setBusy(false)
    }
  }

  const fieldClass =
    "mt-1 h-10 w-full rounded-md border border-input bg-white px-3 text-sm"

  return (
    <section className="space-y-4 rounded-lg border border-slate-200 p-4">
      <div>
        <h3 className="text-xl font-semibold">Weekend Mass</h3>
        <p className="text-sm text-slate-600">
          Save each Mass separately. Times are Malaysia local time.
        </p>
      </div>

      {loading && <p role="status">Loading weekend Masses...</p>}

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
          {!loaded && " Refresh the page to retry."}
        </p>
      )}

      {message && (
        <p role="status" className="text-sm text-green-700">
          {message}
        </p>
      )}

      <fieldset disabled={!loaded || busy} className="space-y-4">
        {loaded && rows.length === 0 && (
          <p className="text-sm text-slate-600">
            No weekend Masses yet. Click Add Mass to create one.
          </p>
        )}

        {rows.map((row) => (
          <form
            key={row.localId}
            onSubmit={(event) => {
              event.preventDefault()
              void saveRow(row)
            }}
            className={`space-y-3 rounded-lg border p-4 ${isEditing(row)
              ? "border-primary bg-primary/5 ring-2 ring-primary/30"
              : "border-slate-200"}`}
          >
            {isEditing(row) && (
              <p role="status" className="text-sm font-semibold text-primary">
                {busy ? "Saving changes..." : "Editing — save or cancel before editing another Mass."}
              </p>
            )}
            <fieldset disabled={!isEditing(row) || busy} className="space-y-3">
            <div className="grid gap-3 md:grid-cols-3">
              <label className="text-sm">
                Language
                <span className="relative block">
                <select
                  value={row.languages[0] ?? ""}
                  required
                  onChange={(event) => {
                    const language = event.target.value
                    setMessage(null)
                    setRows((current) => current.map((item) =>
                      item.localId === row.localId
                        ? { ...item, languages: [language], dirty: true }
                        : item
                    ))
                  }}
                  className={`${fieldClass} appearance-none pr-10`}
                >
                  {["English", "Chinese", "BM", "Tamil"].map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 text-slate-500" />
                </span>
              </label>

              <label className="text-sm">
                Day
                <span className="relative block">
                <select
                  value={row.days_of_week[0] ?? ""}
                  required
                  onChange={(event) => {
                    const day = event.target.value
                    setMessage(null)
                    setRows((current) => current.map((item) =>
                      item.localId === row.localId
                        ? { ...item, days_of_week: [day], dirty: true }
                        : item
                    ))
                  }}
                  className={`${fieldClass} appearance-none pr-10`}
                >
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
                <ChevronDown aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 text-slate-500" />
                </span>
              </label>

              <label className="text-sm">
                Time
                <input
                  type="time"
                  required
                  step={60}
                  value={row.mass_time}
                  onChange={(event) =>
                    updateRow(row.localId, "mass_time", event.target.value)
                  }
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="block text-sm">
              Remarks for this Mass
              <input
                value={row.remarks}
                maxLength={2000}
                onChange={(event) =>
                  updateRow(row.localId, "remarks", event.target.value)
                }
                className={fieldClass}
              />
            </label>

            </fieldset>

            <div className="flex flex-wrap items-center gap-3">
              {isEditing(row) ? (
                <>
                  <Button type="submit" disabled={!row.dirty || busy} className="bg-green-700 text-white hover:bg-green-800">
                    {row.id ? "Save changes" : "Create Mass"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => cancelEdit(row)} disabled={busy}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button type="button" variant="outline" onClick={() => editRow(row)} disabled={activeMass !== null}>
                  Edit
                </Button>
              )}

              <Button
                type="button"
                variant="destructive"
                disabled={activeMass !== null}
                onClick={() => void removeRow(row)}
              >
                {row.id ? "Delete" : "Remove draft"}
              </Button>

              <span className="text-xs text-slate-500">
                {row.dirty ? "Unsaved changes" : "Saved"}
              </span>
            </div>
          </form>
        ))}

        <Button type="button" variant="outline" onClick={addRow} disabled={activeMass !== null}>
          Add Mass
        </Button>
      </fieldset>

      {busy && <p role="status">Saving changes...</p>}
    </section>
  )
}
