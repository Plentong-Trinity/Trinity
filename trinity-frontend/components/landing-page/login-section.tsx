"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login, hasToken, logout } from "@/lib/auth"
import { LogIn, LogOut } from "lucide-react"

export function LoginSection() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(hasToken())
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      await login(email, password)
      setMessage({
        type: "success",
        text: "Login successful! Redirecting...",
      })
      setEmail("")
      setPassword("")
      setIsLoggedIn(true)

      // Redirect to admin page or dashboard after 1 second
      setTimeout(() => {
        router.push("/admin")
      }, 1000)
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Login failed",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = async () => {
    setIsSubmitting(true)
    try {
      await logout()
      setIsLoggedIn(false)
      setMessage({
        type: "success",
        text: "Logged out successfully",
      })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="login" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Authentication</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        </div>

        <div className="flex justify-center">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 w-full max-w-md">
            <CardHeader>
              <CardTitle>{isLoggedIn ? "Welcome" : "Login"}</CardTitle>
              <CardDescription>
                {isLoggedIn ? "You are logged in" : "Sign in with your credentials"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoggedIn ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">You have successfully logged in.</p>
                  <Button
                    onClick={handleLogout}
                    disabled={isSubmitting}
                    variant="outline"
                    className="w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Logging out..." : "Logout"}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>

                  {message && (
                    <div
                      className={`p-3 rounded-md text-sm ${
                        message.type === "success"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {message.text}
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    <LogIn className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
