"use client"

import { useEffect, useState } from "react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { ProfilePicture } from "./profile-picture"

export function ProfileHeader() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatarUrl: "",
    loading: true,
  })

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error || !user) return;
        setUserData({
          firstName: user.user_metadata?.first_name || "",
          lastName: user.user_metadata?.last_name || "",
          email: user.email || "",
          avatarUrl: user.user_metadata?.avatarUrl || "",
          loading: false,
        })
      } catch {
        setUserData(prev => ({ ...prev, loading: false }))
      }
    }
    fetchUserData()
  }, [])

  // Handler to update avatar
  const handleAvatarChange = async (url: string) => {
    // Update in Supabase user_metadata
    await supabase.auth.updateUser({ data: { avatarUrl: url } });
    // Re-fetch the latest user data from Supabase
    const { data: { user } } = await supabase.auth.getUser();
    setUserData(prev => ({
      ...prev,
      avatarUrl: user?.user_metadata?.avatarUrl || url // fallback to url if not found
    }));
    // Optionally, dispatch event for other components
    window.dispatchEvent(new Event("avatar-updated"));
  }

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
              <ProfilePicture avatarUrl={userData.avatarUrl} onChange={handleAvatarChange} />
            </div>
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
