import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { hasToken, isTokenExpired } from "@/lib/auth"

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
