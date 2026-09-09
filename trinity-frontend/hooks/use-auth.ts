import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { hasToken, isTokenExpired, getRoleFromToken } from "@/lib/auth"

/**
 * Hook to protect pages that require authentication
 * Redirects to login page if token is not present or expired
 */
export function useRequireAuth() {
  const router = useRouter()

  useEffect(() => {
    const token = hasToken()
    const expired = isTokenExpired()

    if (!token || expired) {
      router.push("/login")
    }
  }, [router])
}

/**
 * Hook to check if user is authenticated
 * Returns true if token exists and is not expired
 */
export function useIsAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return hasToken() && !isTokenExpired()
}

/**
 * Hook to require a specific role (e.g. "admin")
 * Redirects to login if not authenticated or role mismatch
 */
export function useRequireRole(role: string) {
  const router = useRouter()

  useEffect(() => {
    const token = hasToken()
    const expired = isTokenExpired()
    const userRole = getRoleFromToken()

    if (!token || expired || userRole !== role) {
      router.push("/login")
    }
  }, [router, role])
}

/**
 * Hook to get the current user's role from the token
 */
export function useUserRole(): string | null {
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!hasToken() || isTokenExpired()) {
      setRole(null)
      return
    }
    setRole(getRoleFromToken())
  }, [])

  return role
}
