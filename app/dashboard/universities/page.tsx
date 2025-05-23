"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Star, User, FileText, BookOpen } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

export function RecommendedUniversities() {
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
        
        // Check if both academic profile and preferences exist
        const [academicResult, preferencesResult] = await Promise.all([
          supabase
            .from('academic_profiles')
            .select('id')
            .eq('user_id', user.id)
            .single(),
          supabase
            .from('user_preferences')
            .select('id')
            .eq('user_id', user.id)
            .single()
        ])
        
        setProfileComplete(!!(academicResult.data && preferencesResult.data))
      } catch (error) {
        console.error("Error checking profile completion:", error)
        setProfileComplete(false)
      } finally {
        setLoading(false)
      }
    }
    
    checkProfileCompletion()
  }, [])
  
  // Mock university data
  const universities = [
    {
      name: "Stanford University",
      location: "Stanford, CA",
      programs: ["Computer Science", "Data Science"],
      match: 85,
      logo: "/placeholder.svg?height=40&width=40",
      type: "Reach",
    },
    {
      name: "University of Michigan",
      location: "Ann Arbor, MI",
      programs: ["Computer Science", "Artificial Intelligence"],
      match: 92,
      logo: "/placeholder.svg?height=40&width=40",
      type: "Match",
    },
    {
      name: "Georgia Tech",
      location: "Atlanta, GA",
      programs: ["Computer Science", "Cybersecurity"],
      match: 88,
      logo: "/placeholder.svg?height=40&width=40",
      type: "Match",
    },
  ]

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading recommendations...</p>
        </div>
      </div>
    )
  }

  if (!profileComplete) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-8 text-center">
        <div className="grid grid-cols-3 gap-4 mb-2">
          <div className="flex flex-col items-center justify-center p-4 rounded-lg border">
            <User className="h-8 w-8 text-blue-500 mb-2" />
            <p className="text-sm font-medium">Personal Info</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-lg border">
            <FileText className="h-8 w-8 text-indigo-500 mb-2" />
            <p className="text-sm font-medium">Academic Data</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-lg border">
            <BookOpen className="h-8 w-8 text-purple-500 mb-2" />
            <p className="text-sm font-medium">Preferences</p>
          </div>
        </div>
        <h3 className="text-lg font-medium">Complete Your Profile</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          To receive personalized university recommendations, you need to complete your academic profile and set your preferences.
        </p>
        <Link href="/dashboard/profile?tab=academic">
          <Button>
            Complete Your Profile
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {universities.map((university, index) => (
        <div key={index} className="flex items-start space-x-4 rounded-lg border p-3">
          <div className="flex-shrink-0">
            <Image
              src={university.logo || "/placeholder.svg"}
              alt={university.name}
              width={40}
              height={40}
              className="rounded-md"
            />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{university.name}</h3>
              <div className="flex items-center">
                <div
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    university.type === "Reach"
                      ? "bg-yellow-100 text-yellow-800"
                      : university.type === "Match"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {university.type}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{university.location}</p>
            <div className="flex flex-wrap gap-1">
              {university.programs.map((program, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium"
                >
                  {program}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-xs font-medium">{university.match}% match</span>
              </div>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <ArrowUpRight className="h-4 w-4" />
                <span className="sr-only">View details</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecommendedUniversities;
