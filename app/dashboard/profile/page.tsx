import type { Metadata } from "next"
import { Suspense } from "react"
import { ProfileHeader } from "./components/profile-header"
import { ProfileTabs } from "./components/profile-tabs"

export const metadata: Metadata = {
  title: "Profile | UniMatch",
  description: "Manage your UniMatch profile and preferences",
}

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <ProfileHeader />
      <Suspense fallback={<div className="animate-pulse h-[500px] bg-card rounded-lg"></div>}>
        <ProfileTabs />
      </Suspense>
    </div>
  )
}
