"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, ChartBar, Lightbulb } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"

type AdmissionChance = {
  university: string
  program: string
  status: "Reach" | "Match" | "Safety"
  colorClass: string
  textColorClass: string
}

export function AdmissionChances() {
  const [profileComplete, setProfileComplete] = useState(false)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function checkProfileCompletion() {
      setLoading(true)
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error || !user) {
          setProfileComplete(false)
          return
        }
        
        // Check if academic profile exists
        const { data: academicData } = await supabase
          .from('academic_profiles')
          .select('id')
          .eq('user_id', user.id)
          .single()
        
        setProfileComplete(!!academicData)
      } catch (error) {
        console.error("Error checking profile completion:", error)
        setProfileComplete(false)
      } finally {
        setLoading(false)
      }
    }
    
    checkProfileCompletion()
  }, [])
  
  const chances: AdmissionChance[] = [
    {
      university: "Stanford University",
      program: "Computer Science",
      status: "Reach",
      colorClass: "bg-yellow-500",
      textColorClass: "text-yellow-600"
    },
    {
      university: "University of Michigan",
      program: "Computer Science",
      status: "Match",
      colorClass: "bg-green-500",
      textColorClass: "text-green-600"
    },
    {
      university: "Georgia Tech",
      program: "Computer Science",
      status: "Match",
      colorClass: "bg-green-500",
      textColorClass: "text-green-600"
    },
    {
      university: "UC San Diego",
      program: "Computer Science",
      status: "Safety",
      colorClass: "bg-blue-500",
      textColorClass: "text-blue-600"
    }
  ]
  
  // Legend explanation
  const legend = [
    { status: "Reach", description: "Challenging but possible", colorClass: "bg-yellow-500" },
    { status: "Match", description: "Good fit for your profile", colorClass: "bg-green-500" },
    { status: "Safety", description: "High chance of admission", colorClass: "bg-blue-500" }
  ]

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Admission Chances</CardTitle>
        <CardDescription>Based on your academic profile</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
              <p className="mt-2 text-sm text-muted-foreground">Calculating your chances...</p>
            </div>
          </div>
        ) : !profileComplete ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center">
            <div className="rounded-full bg-amber-100 p-3">
              <Lightbulb className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-medium">Academic Profile Needed</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              To calculate your admission chances, we need your GPA, test scores, and academic history.
            </p>
            <Link href="/dashboard/profile?tab=academic">
              <Button variant="outline" size="sm">
                Complete Academic Profile
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <div className="mb-1 font-medium text-foreground">Legend:</div>
                <div className="space-y-1">
                  {legend.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`mr-2 h-2 w-2 rounded-full ${item.colorClass}`}></div>
                      <span className="font-medium">{item.status}:</span>
                      <span className="ml-1">{item.description}</span>
                    </div>
                  ))}
                </div>
              </div>
              <ChartBar className="h-16 w-16 text-muted-foreground opacity-20" />
            </div>
            
            <div className="space-y-4">
              {chances.map((chance, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">{chance.university}</div>
                    <div className="text-xs text-muted-foreground">{chance.program}</div>
                  </div>
                  <div className="flex items-center">
                    <div className={`text-sm font-semibold ${chance.textColorClass}`}>
                      {chance.status}
                    </div>
                    <div className={`ml-2 h-2 w-2 rounded-full ${chance.colorClass}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full" 
          disabled={!profileComplete}
        >
          View Detailed Analysis
        </Button>
      </CardFooter>
    </Card>
  )
}
