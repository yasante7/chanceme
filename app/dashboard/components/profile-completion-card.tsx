"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, Circle, ClipboardCheck } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ProfileCompletionCard() {
  const [profileData, setProfileData] = useState({
    personal: false,
    academic: false,
    preferences: false,
    security: false
  })
  
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    async function checkProfileCompletion() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error || !user) {
          return
        }
        
        // Check personal info
        const { data: personalData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
          
        // Check academic info
        const { data: academicData } = await supabase
          .from('academic_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()
          
        // Check preferences
        const { data: preferencesData } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single()
          
        // Update completion status
        const updatedData = {
          personal: !!personalData && !!user.user_metadata?.first_name,
          academic: !!academicData,
          preferences: !!preferencesData,
          security: true // By default we consider security setup done
        }
        
        setProfileData(updatedData)
        
        // Calculate progress percentage
        const completedSteps = Object.values(updatedData).filter(Boolean).length
        setProgress((completedSteps / 4) * 100)
        
      } catch (error) {
        console.error("Error checking profile completion:", error)
      }
    }
    
    checkProfileCompletion()
  }, [])
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ClipboardCheck className="mr-2 h-5 w-5 text-primary" />
          Profile Completion
        </CardTitle>
        <CardDescription>
          Complete your profile to get personalized university recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Progress value={progress} className="h-2 w-full" />
          <p className="mt-2 text-sm text-muted-foreground">
            {progress === 100 
              ? "Profile complete! You're all set to get personalized recommendations."
              : `${Math.round(progress)}% completed - Fill in the missing sections to improve your recommendations.`
            }
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            {profileData.personal ? (
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
            ) : (
              <Circle className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span className={profileData.personal ? "font-medium" : "text-muted-foreground"}>
              Personal Information
            </span>
          </div>
          
          <div className="flex items-center">
            {profileData.academic ? (
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
            ) : (
              <Circle className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span className={profileData.academic ? "font-medium" : "text-muted-foreground"}>
              Academic Background
            </span>
          </div>
          
          <div className="flex items-center">
            {profileData.preferences ? (
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
            ) : (
              <Circle className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span className={profileData.preferences ? "font-medium" : "text-muted-foreground"}>
              University Preferences
            </span>
          </div>
          
          <div className="flex items-center">
            {profileData.security ? (
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
            ) : (
              <Circle className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span className={profileData.security ? "font-medium" : "text-muted-foreground"}>
              Security Settings
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
