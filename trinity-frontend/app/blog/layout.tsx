import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow pt-24 md:pt-28">{children}</main>
      <Footer />
    </div>
  )
}
