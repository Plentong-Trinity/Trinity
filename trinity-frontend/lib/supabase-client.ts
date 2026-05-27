/**
 * Supabase client utilities for frontend
 * Note: This is a TypeScript client, but current implementation uses REST API
 * For full Supabase integration, install @supabase/supabase-js
 */

// API endpoints
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

export interface AuthResponse {
  token: string
  user: User
  message: string
}

export interface SignupData {
  email: string
  password: string
  name: string
  phone?: string
}

export interface LoginData {
  email: string
  password: string
}

/**
 * Sign up a new user
 */
export async function signup(data: SignupData): Promise<AuthResponse> {
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
 * Log in a user
 */
export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Login failed")
  }

  return response.json()
}

/**
 * Log out a user
 */
export async function logout(): Promise<void> {
  const token = localStorage.getItem("auth_token")
  if (!token) return

  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.warn("Logout request failed:", error)
  } finally {
    localStorage.removeItem("auth_token")
  }
}

/**
 * Make an authenticated API request
 */
export async function authenticatedFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem("auth_token")

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  const token = localStorage.getItem("auth_token")
  return token !== null && token !== ""
}

/**
 * Get the current auth token
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("auth_token")
}

/**
 * Set the auth token
 */
export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem("auth_token", token)
}

/**
 * Clear the auth token
 */
export function clearAuthToken(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("auth_token")
}
