"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { DocumentSource } from "@/lib/document-data-with-github-fallbacks"

interface ModalContextType {
  selectedDoc: DocumentSource | null
  openModal: (doc: DocumentSource) => void
  closeModal: () => void
  isOpen: boolean
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}

interface ModalProviderProps {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [selectedDoc, setSelectedDoc] = useState<DocumentSource | null>(null)

  const openModal = (doc: DocumentSource) => {
    setSelectedDoc(doc)
  }

  const closeModal = () => {
    setSelectedDoc(null)
  }

  const isOpen = selectedDoc !== null

  return (
    <ModalContext.Provider
      value={{
        selectedDoc,
        openModal,
        closeModal,
        isOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
