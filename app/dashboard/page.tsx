"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, School, BookOpen, User, LayoutDashboard, Bell } from "lucide-react"
import { NavBar } from "@/components/nav-bar"
import { useEffect, useState } from "react"
import { UserData } from "@/types/user"
import { ProgramResult } from "@/utils/program-checker"

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [programs, setPrograms] = useState<ProgramResult[]>([])
  
  useEffect(() => {
    // Load user data from localStorage
    if (typeof window !== 'undefined') {
      const userDataStr = localStorage.getItem('userData')
      const programsStr = localStorage.getItem('qualifyingPrograms')
      
      if (userDataStr) {
        try {
          const parsed = JSON.parse(userDataStr)
          setUserData(parsed)
        } catch (e) {
          console.error('Failed to parse user data:', e)
        }
      }
      
      if (programsStr) {
        try {
          const parsed = JSON.parse(programsStr)
          setPrograms(parsed)
        } catch (e) {
          console.error('Failed to parse programs:', e)
        }
      }
    }
  }, [])

  // Get top 3 program matches
  const topPrograms = programs
    .sort((a, b) => (a.cutoffPoint - a.Aggregate) - (b.cutoffPoint - b.Aggregate))
    .slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      <NavBar />
      
      {/* Dashboard Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {userData?.name || 'Student'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width on desktop */}
          <div className="md:col-span-2 space-y-6">
            {/* Getting Started Widget */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Complete Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>1/4 completed</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <span className="line-through text-muted-foreground">Add your grades</span>
                    </div>
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-xs text-white">
                      ✓
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <School className="h-4 w-4 text-primary" />
                      </div>
                      <span>Select preferred universities</span>
                    </div>
                    <div className="h-5 w-5 rounded-full border border-muted-foreground" />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <GraduationCap className="h-4 w-4 text-primary" />
                      </div>
                      <span>Choose program interests</span>
                    </div>
                    <div className="h-5 w-5 rounded-full border border-muted-foreground" />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <LayoutDashboard className="h-4 w-4 text-primary" />
                      </div>
                      <span>Complete requirements checklist</span>
                    </div>
                    <div className="h-5 w-5 rounded-full border border-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Program Recommendations */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Your Top Program Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPrograms.length > 0 ? (
                    topPrograms.map((program, index) => (
                      <div key={index} className="p-4 border rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{program.program}</h3>
                            <p className="text-sm text-gray-500 mb-2">University of Ghana</p>
                          </div>
                          <span className="text-green-500">98% Match</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View Details</Button>
                          <Button size="sm">Apply Now</Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No matching programs found.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grade Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Your Grade Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-500">Core Mathematics</p>
                    <p className="text-2xl font-bold">A1</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-500">English Language</p>
                    <p className="text-2xl font-bold">B2</p>
                  </div>
                  {/* Add more subjects */}
                </div>
                <Button className="w-full mt-4" variant="outline">View All Grades</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="border-t bg-white dark:bg-gray-800 p-4">
        <div className="flex justify-between max-w-md mx-auto">
          <button className="flex flex-col items-center text-blue-500">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xs">Dashboard</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <School className="h-6 w-6" />
            <span className="text-xs">Universities</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <BookOpen className="h-6 w-6" />
            <span className="text-xs">Programs</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <User className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  )
}