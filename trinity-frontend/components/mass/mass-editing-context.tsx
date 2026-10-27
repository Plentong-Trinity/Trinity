"use client"

import * as React from "react"

type MassEditingState = {
  activeMass: string | null
  startEditing: (key: string) => boolean
  finishEditing: (key: string) => void
}

const MassEditingContext = React.createContext<MassEditingState | null>(null)

export function MassEditingProvider({ children }: { children: React.ReactNode }) {
  const [activeMass, setActiveMass] = React.useState<string | null>(null)
  const activeRef = React.useRef<string | null>(null)

  const startEditing = React.useCallback((key: string) => {
    // Claim the slot synchronously, including clicks before the next render.
    if (activeRef.current !== null) return false
    activeRef.current = key
    setActiveMass(key)
    return true
  }, [])

  const finishEditing = React.useCallback((key: string) => {
    if (activeRef.current !== key) return
    activeRef.current = null
    setActiveMass(null)
  }, [])

  return (
    <MassEditingContext.Provider value={{ activeMass, startEditing, finishEditing }}>
      {children}
    </MassEditingContext.Provider>
  )
}

export function useMassEditing() {
  const context = React.useContext(MassEditingContext)
  if (!context) throw new Error("Mass editors require MassEditingProvider")
  return context
}
