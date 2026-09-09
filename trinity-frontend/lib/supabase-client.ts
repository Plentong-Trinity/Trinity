import { createClient, SupabaseClient } from "@supabase/supabase-js"

// Use public env vars (replace with real keys in .env.local)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // eslint-disable-next-line no-console
  console.warn("Supabase URL or anon key missing — insert NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local")
}

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export type UserMetadata = {
  id: string
  email?: string
  name?: string
}

export type SignupData = {
  email: string
  password: string
  name?: string
  phone?: string
}

export type LoginData = {
  email: string
  password: string
}

export async function signup(data: SignupData) {
  const { email, password, name } = data
  const res = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  })

  if (res.error) throw res.error
  return res.data
}

export async function login(data: LoginData) {
  const { email, password } = data
  const res = await supabase.auth.signInWithPassword({ email, password })
  if (res.error) throw res.error

  // store access token for authenticated requests to your backend if needed
  const session = res.data.session
  if (session && typeof window !== "undefined") {
    localStorage.setItem("supabase_access_token", session.access_token)
  }

  return res.data
}

export async function logout() {
  await supabase.auth.signOut()
  if (typeof window !== "undefined") {
    localStorage.removeItem("supabase_access_token")
  }
}

export async function authenticatedFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("supabase_access_token") : null
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  }
  if (token) headers["Authorization"] = `Bearer ${token}`

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
  return fetch(`${API_URL}${endpoint}`, { ...options, headers })
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  const token = localStorage.getItem("supabase_access_token")
  return !!token
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("supabase_access_token")
}

export function clearAuthToken(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("supabase_access_token")
}
