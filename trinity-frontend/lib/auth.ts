/**
 * Token utilities for managing JWT tokens in localStorage
 * This now integrates with Supabase backend for real authentication
 */

const TOKEN_KEY = "auth_token"
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: "user" | "admin" | "staff"
  is_active: boolean
  created_at: string
  updated_at: string
  last_login_at?: string
}

export interface LoginResponse {
  token: string
  user: User
  message: string
}

export interface SignupRequest {
  email: string
  password: string
  name: string
  phone?: string
}

/**
 * Get the stored JWT token from localStorage
 */
export function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * Store the JWT token in localStorage
 */
export function setToken(token: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * Remove the JWT token from localStorage
 */
export function removeToken(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * Check if a token exists
 */
export function hasToken(): boolean {
  return getToken() !== null
}

/**
 * Get the authorization header value
 */
export function getAuthHeader(): { Authorization: string } | {} {
  const token = getToken()
  if (!token) return {}
  return {
    Authorization: `Bearer ${token}`,
  }
}

/**
 * Login with email and password
 * Authenticates against Supabase database
 */
export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Login failed")
  }

  const data = (await response.json()) as LoginResponse
  setToken(data.token)
  return data
}

/**
 * Sign up a new user
 */
export async function signup(data: SignupRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Signup failed")
  }

  return response.json()
}

/**
 * Logout the current user
 */
export async function logout(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        ...getAuthHeader(),
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.warn("Logout request failed, but clearing local token anyway")
    }
  } catch (error) {
    console.warn("Error during logout request:", error)
  } finally {
    removeToken()
  }
}

/**
 * Decode JWT token to get claims (without verification)
 * Note: This does NOT verify the signature, only decodes the payload
 * Use only for reading claims on the client side
 */
export function decodeToken(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null

    const payload = parts[1]
    const decodedPayload = atob(payload)
    return JSON.parse(decodedPayload)
  } catch {
    return null
  }
}

/**
 * Get the email from the stored token
 */
export function getEmailFromToken(): string | null {
  const token = getToken()
  if (!token) return null

  const decoded = decodeToken(token)
  return (decoded?.email as string) || null
}

/**
 * Get the user ID from the stored token
 */
export function getUserIdFromToken(): string | null {
  const token = getToken()
  if (!token) return null

  const decoded = decodeToken(token)
  return (decoded?.user_id as string) || null
}

/**
 * Get the user role from the stored token
 */
export function getRoleFromToken(): string | null {
  const token = getToken()
  if (!token) return null

  const decoded = decodeToken(token)
  return (decoded?.role as string) || null
}

/**
 * Check if the token is expired
 */
export function isTokenExpired(): boolean {
  const token = getToken()
  if (!token) return true

  const decoded = decodeToken(token)
  if (!decoded?.exp) return true

  const expirationTime = (decoded.exp as number) * 1000 // Convert to milliseconds
  return Date.now() > expirationTime
}

