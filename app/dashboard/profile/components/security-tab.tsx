"use client"

import React, { useState } from "react"
import { Eye, EyeOff, Save } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Define types for password fields
type PasswordField = 'current' | 'new' | 'confirm';

// Define the interface for the error object
interface ErrorWithMessage {
  message: string;
}

// Type guard for error with message
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  )
}

// Function to get the error message
function getErrorMessage(error: unknown): string {
  if (isErrorWithMessage(error)) {
    return error.message
  }
  return "An unknown error occurred"
}

export function SecurityTab() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  })
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }
  
  const togglePasswordVisibility = (field: PasswordField) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    
    // Validate password
    if (formData.newPassword.length < 6) {
      setMessage("Error: Password must be at least 6 characters long")
      setLoading(false)
      return
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("Error: New passwords do not match")
      setLoading(false)
      return
    }
    
    try {
      // First attempt to sign in with current password to verify it's correct
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: (await supabase.auth.getUser()).data.user?.email || "",
        password: formData.currentPassword,
      })
      
      if (signInError) {
        throw new Error("Current password is incorrect")
      }
      
      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: formData.newPassword
      })
      
      if (updateError) {
        throw updateError
      }
      
      setMessage("Password updated successfully!")
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error: unknown) {
      console.error("Error updating password:", error)
      setMessage(`Error: ${getErrorMessage(error)}`)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Update your password and manage security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                name="currentPassword"
                type={showPassword.current ? "text" : "password"}
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility("current")}
              >
                {showPassword.current ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">{showPassword.current ? "Hide" : "Show"} password</span>
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={showPassword.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility("new")}
              >
                {showPassword.new ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">{showPassword.new ? "Hide" : "Show"} password</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Password must be at least 6 characters and include a number and a special character.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility("confirm")}
              >
                {showPassword.confirm ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">{showPassword.confirm ? "Hide" : "Show"} password</span>
              </Button>
            </div>
          </div>
          
          <div className="space-y-4 pt-4">
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium">Account Security</h3>
              <p className="text-sm text-muted-foreground">Additional security options</p>
            </div>
          
            <div>
              <Button variant="outline" type="button" className="w-full">
                Enable Two-Factor Authentication
              </Button>
              <p className="mt-1 text-xs text-muted-foreground">
                Add an extra layer of security to your account with two-factor authentication.
              </p>
            </div>
            
            <div>
              <Button variant="outline" type="button" className="w-full">
                View Login History
              </Button>
              <p className="mt-1 text-xs text-muted-foreground">
                Review recent login activity on your account.
              </p>
            </div>
            
            <div>
              <Button variant="destructive" type="button" className="w-full">
                Delete Account
              </Button>
              <p className="mt-1 text-xs text-muted-foreground">
                Permanently delete your account and all your data.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            {message && (
              <p className={`text-sm ${message.includes("Error") ? "text-destructive" : "text-green-600"}`}>
                {message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={loading}>
            {loading && <Save className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
