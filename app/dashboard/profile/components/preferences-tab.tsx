"use client"

import React, { useState, useEffect } from "react"
import { Save } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

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

export function PreferencesTab() {
  const [formData, setFormData] = useState({
    universityType: "any",
    campusSize: "any",
    location: "any",
    distance: [500], // miles from home
    tuitionBudget: [50000], // yearly tuition budget in USD
    majorsOfInterest: [] as string[],
    notification: {
      email: true,
      application: true,
      deadline: true,
      recommendation: true
    }
  })
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  
  useEffect(() => {
    async function fetchPreferences() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error) {
          console.error("Error fetching user:", error.message)
          return
        }
        
        if (user) {
          // Get preferences from preferences table if exists
          const { data: preferencesData } = await supabase
            .from('user_preferences')
            .select('*')
            .eq('user_id', user.id)
            .single()
            
          if (preferencesData) {
            setFormData({
              universityType: preferencesData.university_type || "any",
              campusSize: preferencesData.campus_size || "any",
              location: preferencesData.location || "any",
              distance: [preferencesData.max_distance || 500],
              tuitionBudget: [preferencesData.max_tuition || 50000],
              majorsOfInterest: preferencesData.majors_of_interest || [],
              notification: {
                email: preferencesData.notify_email !== false,
                application: preferencesData.notify_application !== false,
                deadline: preferencesData.notify_deadline !== false,
                recommendation: preferencesData.notify_recommendation !== false
              }
            })
          }
        }
      } catch (error) {
        console.error("Error fetching preferences:", error)
      }
    }
    
    fetchPreferences()
  }, [])
    const handleSelectChange = (name: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }
  
  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }
  
  const handleSwitchChange = (category: string, checked: boolean) => {
    setFormData(prevData => ({
      ...prevData,
      notification: {
        ...prevData.notification,
        [category]: checked
      }
    }))
  }
  
  const handleMajorToggle = (major: string) => {
    setFormData(prevData => {
      const currentMajors = [...prevData.majorsOfInterest]
      
      if (currentMajors.includes(major)) {
        return {
          ...prevData,
          majorsOfInterest: currentMajors.filter(m => m !== major)
        }
      } else {
        return {
          ...prevData,
          majorsOfInterest: [...currentMajors, major]
        }
      }
    })
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        throw userError
      }
      
      if (!user) {
        throw new Error("User not authenticated")
      }
      
      // Upsert preferences in user_preferences table
      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          university_type: formData.universityType,
          campus_size: formData.campusSize,
          location: formData.location,
          max_distance: formData.distance[0],
          max_tuition: formData.tuitionBudget[0],
          majors_of_interest: formData.majorsOfInterest,
          notify_email: formData.notification.email,
          notify_application: formData.notification.application,
          notify_deadline: formData.notification.deadline,
          notify_recommendation: formData.notification.recommendation,
          updated_at: new Date().toISOString()
        })
      
      if (preferencesError) {
        throw preferencesError
      }
      
      setMessage("Preferences updated successfully!")
    } catch (error: unknown) {
      console.error("Error updating preferences:", error)
      setMessage(`Error: ${getErrorMessage(error)}`)
    } finally {
      setLoading(false)
    }
  }
  
  // Popular academic majors
  const popularMajors = [
    "Computer Science",
    "Business Administration",
    "Engineering",
    "Psychology",
    "Biology",
    "Nursing",
    "Communications",
    "Economics",
    "English",
    "Political Science",
    "Mathematics",
    "Chemistry",
    "History",
    "Sociology",
    "Art and Design"
  ]
  
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>University Preferences</CardTitle>
          <CardDescription>
            Set your preferences to help us find universities that match your needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>University Type</Label>
            <RadioGroup 
              value={formData.universityType} 
              onValueChange={(value) => handleSelectChange("universityType", value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="any-type" />
                <Label htmlFor="any-type" className="font-normal">Any type</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public" className="font-normal">Public</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private" className="font-normal">Private</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="community" id="community" />
                <Label htmlFor="community" className="font-normal">Community College</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label>Campus Size</Label>
            <RadioGroup 
              value={formData.campusSize} 
              onValueChange={(value) => handleSelectChange("campusSize", value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="any-size" />
                <Label htmlFor="any-size" className="font-normal">Any size</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="small" />
                <Label htmlFor="small" className="font-normal">Small (less than 5,000 students)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="font-normal">Medium (5,000 - 15,000 students)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="large" />
                <Label htmlFor="large" className="font-normal">Large (more than 15,000 students)</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location Preference</Label>
            <Select 
              value={formData.location} 
              onValueChange={(value) => handleSelectChange("location", value)}
            >
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Anywhere</SelectItem>
                <SelectItem value="urban">Urban</SelectItem>
                <SelectItem value="suburban">Suburban</SelectItem>
                <SelectItem value="rural">Rural</SelectItem>
                <SelectItem value="northeast">Northeast US</SelectItem>
                <SelectItem value="midwest">Midwest US</SelectItem>
                <SelectItem value="south">Southern US</SelectItem>
                <SelectItem value="west">Western US</SelectItem>
                <SelectItem value="international">International</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Maximum Distance from Home</Label>
                <span className="text-sm text-muted-foreground">{formData.distance[0]} miles</span>
              </div>
              <Slider
                defaultValue={formData.distance}
                max={3000}
                step={50}
                onValueChange={(value) => handleSliderChange("distance", value)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 miles</span>
                <span>3,000 miles</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Maximum Yearly Tuition Budget</Label>
                <span className="text-sm text-muted-foreground">${formData.tuitionBudget[0].toLocaleString()}</span>
              </div>
              <Slider
                defaultValue={formData.tuitionBudget}
                max={100000}
                step={1000}
                onValueChange={(value) => handleSliderChange("tuitionBudget", value)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$0</span>
                <span>$100,000</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Majors of Interest</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {popularMajors.map((major) => (
                <div key={major} className="flex items-center space-x-2">
                  <Checkbox
                    id={`major-${major.toLowerCase().replace(/\s+/g, '-')}`}
                    checked={formData.majorsOfInterest.includes(major)}
                    onCheckedChange={() => handleMajorToggle(major)}
                  />
                  <Label
                    htmlFor={`major-${major.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm font-normal"
                  >
                    {major}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <Label>Notification Preferences</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notif" className="font-normal">
                  Email Notifications
                </Label>
                <Switch
                  id="email-notif"
                  checked={formData.notification.email}
                  onCheckedChange={(checked) => handleSwitchChange("email", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="app-notif" className="font-normal">
                  Application Updates
                </Label>
                <Switch
                  id="app-notif"
                  checked={formData.notification.application}
                  onCheckedChange={(checked) => handleSwitchChange("application", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="deadline-notif" className="font-normal">
                  Deadline Reminders
                </Label>
                <Switch
                  id="deadline-notif"
                  checked={formData.notification.deadline}
                  onCheckedChange={(checked) => handleSwitchChange("deadline", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="rec-notif" className="font-normal">
                  University Recommendations
                </Label>
                <Switch
                  id="rec-notif"
                  checked={formData.notification.recommendation}
                  onCheckedChange={(checked) => handleSwitchChange("recommendation", checked)}
                />
              </div>
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
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
