"use client"
import MainContent from "@/app/main-content"

// page.tsx remains a small client component that simply renders the
// main client-side tree (MainContent already wraps itself in ModalProvider).
export default function Home() {
  return <MainContent />
}
