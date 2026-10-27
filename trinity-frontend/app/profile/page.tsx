"use client"

import * as React from "react"
import { KeyRound, UserRound } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRequireAuth } from "@/hooks/use-auth"
import { changePassword, getNameFromToken, getEmailFromToken, updateProfileName } from "@/lib/auth"

export default function ProfilePage() {
  const isCheckingAuth = useRequireAuth()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [nameMessage, setNameMessage] = React.useState("")
  const [passwordMessage, setPasswordMessage] = React.useState("")
  const [nameError, setNameError] = React.useState("")
  const [passwordError, setPasswordError] = React.useState("")
  const [isSavingName, setIsSavingName] = React.useState(false)
  const [isChangingPassword, setIsChangingPassword] = React.useState(false)

  React.useEffect(() => {
    if (isCheckingAuth) return
    setName(getNameFromToken() || "")
    setEmail(getEmailFromToken() || "")
  }, [isCheckingAuth])

  async function handleNameSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNameMessage("")
    setNameError("")
    setIsSavingName(true)
    try {
      const result = await updateProfileName(name.trim())
      setName(result.user.name)
      setNameMessage("Your name has been updated.")
    } catch (error) {
      setNameError(error instanceof Error ? error.message : "Failed to update your name.")
    } finally {
      setIsSavingName(false)
    }
  }

  async function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPasswordMessage("")
    setPasswordError("")

    if (newPassword !== confirmPassword) {
      setPasswordError("The new passwords do not match.")
      return
    }
    if (newPassword.length < 6) {
      setPasswordError("Your new password must be at least 6 characters.")
      return
    }

    setIsChangingPassword(true)
    try {
      const result = await changePassword(currentPassword, newPassword)
      setPasswordMessage(result.message)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      setPasswordError(error instanceof Error ? error.message : "Failed to change your password.")
    } finally {
      setIsChangingPassword(false)
    }
  }

  if (isCheckingAuth) {
    return (
      <main className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-muted-foreground">Loading your profile...</p>
      </main>
    )
  }

  return (
    <main className="container mx-auto max-w-3xl space-y-6 px-4 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your profile</h1>
        <p className="mt-2 text-muted-foreground">Update your name or change your account password.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserRound className="h-5 w-5" />
            Profile details
          </CardTitle>
          <CardDescription>Your email address is used to sign in and cannot be changed here.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleNameSubmit}>
            <div className="space-y-2">
              <Label htmlFor="profile-email">Email</Label>
              <Input id="profile-email" type="email" value={email} readOnly disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-name">Name</Label>
              <Input
                id="profile-name"
                autoComplete="name"
                maxLength={255}
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            {nameError && <p role="alert" className="text-sm text-destructive">{nameError}</p>}
            {nameMessage && <p role="status" className="text-sm text-emerald-700">{nameMessage}</p>}
            <Button type="submit" disabled={isSavingName || name.trim().length === 0}>
              {isSavingName ? "Saving..." : "Save name"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            Change password
          </CardTitle>
          <CardDescription>Enter your current password to set a new one.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handlePasswordSubmit}>
            <div className="space-y-2">
              <Label htmlFor="current-password">Current password</Label>
              <Input
                id="current-password"
                type="password"
                autoComplete="current-password"
                required
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                type="password"
                autoComplete="new-password"
                minLength={6}
                maxLength={72}
                required
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm new password</Label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                minLength={6}
                maxLength={72}
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            {passwordError && <p role="alert" className="text-sm text-destructive">{passwordError}</p>}
            {passwordMessage && <p role="status" className="text-sm text-emerald-700">{passwordMessage}</p>}
            <Button type="submit" disabled={isChangingPassword}>
              {isChangingPassword ? "Changing password..." : "Change password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
