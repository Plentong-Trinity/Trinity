"use client"

import * as React from "react"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MassMultiSelect } from "@/components/mass/mass-multi-select"
import { useMassEditing } from "@/components/mass/mass-editing-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  listSpecialMass,
  saveSpecialMass,
  deleteSpecialMass,
  type SpecialMass,
  type SpecialMassInput,
} from "@/lib/special-mass"

type DraftMass = SpecialMassInput & {
  localId: string
  id?: string
  dirty: boolean
}

function toDraft(mass: SpecialMass): DraftMass {
  return {
    ...mass,
    localId: mass.id,
    dirty: false,
  }
}

export function SpecialMassEditor() {
  const { activeMass, startEditing, finishEditing } = useMassEditing()
  const originalRow = React.useRef<DraftMass | null>(null)
  const rowKey = (localId: string) => `special:${localId}`
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
        const masses = await listSpecialMass(controller.signal)

        if (!controller.signal.aborted) {
          setRows(masses.map(toDraft))
          setLoaded(true)
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(
            error instanceof Error
              ? error.message
              : "Could not load Special Masses."
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
        title: "New Special Mass",
        languages: ["English"],
        mass_date: "",
        mass_time: "17:00",
        remarks: "",
        dirty: true,
      },
    ])
  }

  function editRow(row: DraftMass) {
    if (busy || !startEditing(rowKey(row.localId))) return
    originalRow.current = { ...row, languages: [...row.languages] }
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
    field: Exclude<keyof SpecialMassInput, "languages">,
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

    if (row.languages.length === 0) {
      setError("Select at least one language for this Mass.")
      return
    }

    setBusy(true)
    setError(null)
    setMessage(null)

    try {
      const saved = await saveSpecialMass(
        {
          title: row.title,
          languages: row.languages,
          mass_date: row.mass_date,
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
      setMessage("Special Mass saved.")
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not save Special Mass."
      )
    } finally {
      setBusy(false)
    }
  }

  async function removeRow(row: DraftMass) {
    if (busy || activeMass !== null) return

    if (!row.id) {
      setRows((current) =>
        current.filter((item) => item.localId !== row.localId)
      )
      setMessage(null)
      return
    }

    if (
      !window.confirm(
        "Delete this Special Mass from the saved schedule? This takes effect immediately."
      )
    ) {
      return
    }

    if (!startEditing(rowKey(row.localId))) return
    setBusy(true)
    setError(null)
    setMessage(null)

    try {
      await deleteSpecialMass(row.id)

      setRows((current) =>
        current.filter((item) => item.localId !== row.localId)
      )

      setMessage("Special Mass deleted.")
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not delete Special Mass."
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
        <h3 className="text-xl font-semibold">Special Mass</h3>
        <p className="text-sm text-slate-600">
          Save each special event separately. Times are Malaysia local time.
        </p>
      </div>

      {loading && <p role="status">Loading Special Masses...</p>}

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
            No Special Masses yet. Click Add Mass to create one.
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
            <div className="space-y-2">
              <Label>Mass title</Label>
              <Input
                value={row.title}
                onChange={(event) =>
                  updateRow(row.localId, "title", event.target.value)
                }
                className="bg-white"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="min-w-0 space-y-2">
                <Label htmlFor={`special-languages-${row.localId}`}>Languages</Label>
                <MassMultiSelect
                  id={`special-languages-${row.localId}`}
                  label="Languages"
                  options={["English", "Chinese", "BM", "Tamil"]}
                  value={row.languages}
                  disabled={!loaded || busy || !isEditing(row)}
                  onChange={(languages) => {
                    setMessage(null)
                    setRows((current) => current.map((item) =>
                      item.localId === row.localId
                        ? { ...item, languages, dirty: true }
                        : item
                    ))
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={row.mass_date}
                  onChange={(event) =>
                    updateRow(row.localId, "mass_date", event.target.value)
                  }
                  className="bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <Input
                type="time"
                step={60}
                value={row.mass_time}
                onChange={(event) =>
                  updateRow(row.localId, "mass_time", event.target.value)
                }
                className={fieldClass}
              />
            </div>

            <div className="space-y-2">
              <Label>Remarks</Label>
              <Input
                value={row.remarks}
                onChange={(event) =>
                  updateRow(row.localId, "remarks", event.target.value)
                }
                className="bg-white"
              />
            </div>

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

        <Button type="button" variant="outline" onClick={addRow} disabled={activeMass !== null} className="gap-2">
          <Plus className="h-4 w-4" /> Add Mass
        </Button>
      </fieldset>
    </section>
  )
}
