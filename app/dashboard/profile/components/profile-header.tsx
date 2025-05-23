"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, Camera } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

export function ProfileHeader() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    loading: true,
  })

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error) {
          console.error("Error fetching user:", error.message)
          return
        }
        
        if (user) {
          setUserData({
            firstName: user.user_metadata?.first_name || "",
            lastName: user.user_metadata?.last_name || "",
            email: user.email || "",
            loading: false,
          })
        }
      } catch (error) {
        console.error("Unexpected error:", error)
      } finally {
        setUserData(prev => ({ ...prev, loading: false }))
      }
    }
    
    fetchUserData()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
      
      <div className="relative">
        <div className="h-48 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <div className="absolute left-8 -bottom-12 flex items-end gap-4">
          <div className="relative">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-background bg-background">
              <Image
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${userData.firstName} ${userData.lastName}`}
                alt="Profile picture"
                fill
                className="object-cover"
              />
            </div>
            <Button variant="outline" size="icon" className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full bg-background">
              <Camera className="h-4 w-4" />
              <span className="sr-only">Change profile picture</span>
            </Button>
          </div>
          <div className="mb-2">
            <h1 className="text-2xl font-bold">
              {userData.loading 
                ? "Loading..." 
                : `${userData.firstName} ${userData.lastName}`
              }
            </h1>
            <p className="text-muted-foreground">{userData.email}</p>
          </div>
        </div>
      </div>
      
      <div className="h-12"></div>
    </div>
  )
}
