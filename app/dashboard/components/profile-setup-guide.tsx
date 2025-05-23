"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown, ChevronUp, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ProfileSetupGuide() {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const steps = [
    {
      title: "Complete your Personal Information",
      description: "Add your contact details and personal information to create your profile",
      link: "/dashboard/profile?tab=personal"
    },
    {
      title: "Update your Academic Background",
      description: "Add your GPA, test scores, and educational history for better matches",
      link: "/dashboard/profile?tab=academic"
    },
    {
      title: "Set your University Preferences",
      description: "Define your preferences for location, size, tuition budget, and majors",
      link: "/dashboard/profile?tab=preferences"
    },
    {
      title: "Secure your Account",
      description: "Make sure your password is strong and your account is secure",
      link: "/dashboard/profile?tab=security"
    }
  ]
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
            <CardTitle>Get Started Guide</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="sr-only">
              {isExpanded ? "Collapse" : "Expand"}
            </span>
          </Button>
        </div>
        <CardDescription>
          Follow these steps to improve your university recommendations
        </CardDescription>
      </CardHeader>
      
      {isExpanded && (
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="rounded-lg border p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">
                      <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {index + 1}
                      </span>
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  <Link href={step.link}>
                    <Button size="sm" variant="ghost" className="h-8">
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
