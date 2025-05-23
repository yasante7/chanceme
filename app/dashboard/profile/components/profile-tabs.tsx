"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoTab } from "./personal-info-tab"
import { AcademicInfoTab } from "./academic-info-tab"
import { PreferencesTab } from "./preferences-tab"
import { SecurityTab } from "./security-tab"

export function ProfileTabs() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("personal")
  
  useEffect(() => {
    // Get the tab from URL query parameters
    const tabParam = searchParams.get("tab")
    if (tabParam && ["personal", "academic", "preferences", "security"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [searchParams])
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid w-full max-w-lg grid-cols-4">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="academic">Academic</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal" className="space-y-6">
        <PersonalInfoTab />
      </TabsContent>
      
      <TabsContent value="academic" className="space-y-6">
        <AcademicInfoTab />
      </TabsContent>
      
      <TabsContent value="preferences" className="space-y-6">
        <PreferencesTab />
      </TabsContent>
      
      <TabsContent value="security" className="space-y-6">
        <SecurityTab />
      </TabsContent>
    </Tabs>
  )
}
