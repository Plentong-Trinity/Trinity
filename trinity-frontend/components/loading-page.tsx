"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type LoadingPageProps = {
  accessDenied?: boolean
}

export function LoadingPage({ accessDenied = false }: LoadingPageProps) {
  const router = useRouter()
  const [secondsRemaining, setSecondsRemaining] = useState(3)

  useEffect(() => {
    if (!accessDenied) return

    const interval = window.setInterval(() => {
      setSecondsRemaining((seconds) => Math.max(seconds - 1, 0))
    }, 1000)
    const timeout = window.setTimeout(() => router.back(), 3000)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(timeout)
    }
  }, [accessDenied, router])

  if (accessDenied) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6 text-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Access denied</h1>
          <p className="mt-2 text-sm text-slate-600">
            You do not have permission to access this dashboard.
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Returning in {secondsRemaining} second{secondsRemaining === 1 ? "" : "s"}...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white" aria-busy="true">
      <div
        aria-label="Loading"
        className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900"
      />
    </main>
  )
}
