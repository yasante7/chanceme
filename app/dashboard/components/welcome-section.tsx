"use client"

import { useEffect, useState } from "react"
import { Bell, GraduationCap } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

export function WelcomeSection() {
  const [firstName, setFirstName] = useState<string>("User")
  
  useEffect(() => {
    async function getUserData() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error) {
          console.error("Error fetching user:", error.message)
          return
        }
        
        if (user?.user_metadata?.first_name) {
          setFirstName(user.user_metadata.first_name)
          console.log(user.user_metadata)
        }
      } catch (error) {
        console.error("Unexpected error:", error)
      }
    }
    
    getUserData()
  }, [])

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back, {firstName}! Here&apos;s your admission journey overview.</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
        <Button>
          <GraduationCap className="mr-2 h-4 w-4" />
          Find Universities
        </Button>
      </div>
    </div>
  )
}
