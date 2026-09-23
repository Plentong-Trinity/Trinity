import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { hasToken, isTokenExpired, getRoleFromToken } from "@/lib/auth"

export type RoleGuardStatus = boolean | "denied"

/**
 * Hook to protect pages that require authentication
 * Redirects to login page if token is not present or expired
 */
export function useRequireAuth(): boolean {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const token = hasToken()
    const expired = isTokenExpired()

    if (!token || expired) {
      router.replace("/login")
      return
    }

    setIsChecking(false)
  }, [router])

  return isChecking
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
export function useRequireRole(role: string): RoleGuardStatus {
  const router = useRouter()
  const [status, setStatus] = useState<RoleGuardStatus>(true)

  useEffect(() => {
    const token = hasToken()
    const expired = isTokenExpired()
    const userRole = getRoleFromToken()

    if (!token || expired) {
      router.replace("/login")
      return
    }

    if (userRole !== role) {
      setStatus("denied")
      return
    }

    setStatus(false)
  }, [router, role])

  return status
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
