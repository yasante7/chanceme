"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Compass, CheckCircle, Circle } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function NextSteps() {
  const [profileStatus, setProfileStatus] = useState({
    personal: false,
    academic: false,
    preferences: false
  })
  
  const [nextStep, setNextStep] = useState({
    title: "Complete Your Profile",
    description: "Fill out your personal information",
    link: "/dashboard/profile?tab=personal",
    completed: false
  })
  
  useEffect(() => {
    async function checkProfileAndSetNextStep() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error || !user) {
          return
        }
        
        // Check personal info completion
        const { data: personalData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        
        const hasPersonalInfo = !!personalData && !!user.user_metadata?.first_name
        
        // Check academic info completion
        const { data: academicData } = await supabase
          .from('academic_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()
        
        const hasAcademicInfo = !!academicData
        
        // Check preferences completion
        const { data: preferencesData } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single()
          
        const hasPreferences = !!preferencesData
        
        setProfileStatus({
          personal: hasPersonalInfo,
          academic: hasAcademicInfo,
          preferences: hasPreferences
        })
        
        // Set the next step based on what's missing
        if (!hasPersonalInfo) {
          setNextStep({
            title: "Complete Your Profile",
            description: "Fill out your personal information",
            link: "/dashboard/profile?tab=personal",
            completed: false
          })
        } else if (!hasAcademicInfo) {
          setNextStep({
            title: "Add Academic Details",
            description: "Enter your GPA, test scores, and academic achievements",
            link: "/dashboard/profile?tab=academic",
            completed: false
          })
        } else if (!hasPreferences) {
          setNextStep({
            title: "Set Your Preferences",
            description: "Tell us what you're looking for in a university",
            link: "/dashboard/profile?tab=preferences",
            completed: false
          })
        } else {
          // All steps completed - suggest exploring recommendations
          setNextStep({
            title: "Explore Recommendations",
            description: "Check out universities that match your profile",
            link: "/dashboard/recommendations",
            completed: true
          })
        }
      } catch (error) {
        console.error("Error checking profile:", error)
      }
    }
    
    checkProfileAndSetNextStep()
  }, [])
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Compass className="mr-2 h-5 w-5 text-blue-500" />
          <CardTitle>Next Steps</CardTitle>
        </div>
        <CardDescription>
          {nextStep.completed 
            ? "Great job! Your profile is complete. Here's what you can do next:"
            : "Complete these steps to get personalized university recommendations:"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg border p-4">
            {profileStatus.personal ? (
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
            ) : (
              <Circle className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className={`font-medium ${profileStatus.personal ? "text-green-700 dark:text-green-400" : ""}`}>
                  Personal Information
                </h3>
                {!profileStatus.personal && (
                  <Link href="/dashboard/profile?tab=personal">
                    <Button size="sm" variant="ghost">
                      Complete
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {profileStatus.personal 
                  ? "Basic profile information completed" 
                  : "Add your contact details and personal information"}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 rounded-lg border p-4">
            {profileStatus.academic ? (
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
            ) : (
              <Circle className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className={`font-medium ${profileStatus.academic ? "text-green-700 dark:text-green-400" : ""}`}>
                  Academic Details
                </h3>
                {!profileStatus.academic && (
                  <Link href="/dashboard/profile?tab=academic">
                    <Button size="sm" variant="ghost">
                      Complete
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {profileStatus.academic 
                  ? "Academic information completed" 
                  : "Add your GPA, test scores, and academic achievements"}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 rounded-lg border p-4">
            {profileStatus.preferences ? (
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
            ) : (
              <Circle className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className={`font-medium ${profileStatus.preferences ? "text-green-700 dark:text-green-400" : ""}`}>
                  University Preferences
                </h3>
                {!profileStatus.preferences && (
                  <Link href="/dashboard/profile?tab=preferences">
                    <Button size="sm" variant="ghost">
                      Complete
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {profileStatus.preferences 
                  ? "Preference settings completed" 
                  : "Set your preferences for location, size, and cost"}
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <Link href={nextStep.link}>
              <Button className="w-full">
                {nextStep.title}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {nextStep.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
