"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClipboardList, Search, ArrowRight } from "lucide-react"

export default function EmptyRecommendations() {
  return (
    <Card className="border-none shadow-lg">
      <CardContent className="p-0">
        <div className="border-b border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold">Your Program Recommendations</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Enter your WASSCE grades to see programs you qualify for
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-6">
            <ClipboardList className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No recommendations yet</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
            We need your WASSCE grades to match you with university programs that you qualify for. Enter your grades to
            get personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex items-center" onClick={() => window.location.href = '/dashboard/onboarding/grades'}>
              Enter Your Grades
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="flex items-center">
              <Search className="mr-2 h-4 w-4" />
              Browse All Programs
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
