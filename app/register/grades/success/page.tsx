"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, ArrowRight, User, BookOpen } from "lucide-react"
import { NavBar } from "@/components/nav-bar"
import { UserData, Grade } from "@/types/user"

const GRADE_POINTS: Record<Grade, number> = {
  'A1': 1,
  'B2': 2,
  'B3': 3,
  'C4': 4,
  'C5': 5,
  'C6': 6,
  'D7': 7,
  'E8': 8,
  'F9': 9
}

interface Program {
  program: string;
  campus: string;
  cutoffPoint: number;
  userPoints: number;
  qualified: boolean;
}

export default function GradesSuccessPage() {
  const [qualifyingPrograms, setQualifyingPrograms] = useState<Program[]>([])
  const [userData, setUserData] = useState<UserData | null>(null)
  const [aggregate, setAggregate] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return; // Prevent SSR issues

      const programs = localStorage.getItem('qualifyingPrograms')
      const user = localStorage.getItem('userData')
      
      console.log('Retrieved programs from localStorage:', programs)
      
      if (programs) {
        const parsedPrograms = JSON.parse(programs)
        console.log('Parsed programs:', parsedPrograms)
        if (Array.isArray(parsedPrograms)) {
          console.log('Setting qualifying programs:', parsedPrograms)
          setQualifyingPrograms(parsedPrograms)
        } else {
          console.error('Programs data is not an array:', typeof parsedPrograms)
        }
      } else {
        console.error('No programs found in localStorage')
      }
      
      if (user) {
        const parsedUser = JSON.parse(user)
        if (parsedUser && parsedUser.grades) {
          setUserData(parsedUser)
          
          // Calculate aggregate from grades
          const gradeData = parsedUser.grades
          const allGrades = [...gradeData.core_subjects, ...gradeData.elective_subjects]
          
          const gradePoints = allGrades.map(subject => {
            const grade = subject.grade as Grade
            if (!(grade in GRADE_POINTS)) {
              throw new Error(`Invalid grade: ${grade}`)
            }
            return GRADE_POINTS[grade]
          })
          
          const sortedPoints = gradePoints.sort((a, b) => a - b)
          const bestSixPoints = sortedPoints.slice(0, 6)
          const bestSixTotal = bestSixPoints.reduce((sum, points) => sum + points, 0)
          
          setAggregate(bestSixTotal)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing your data')
      console.error('Error processing user data:', err)
    }
  }, [])

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-muted/50">
        <NavBar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="max-w-2xl w-full bg-background rounded-xl shadow-lg p-8 border">
            <div className="text-center text-red-500">
              <h2 className="text-xl font-semibold mb-4">Error</h2>
              <p>{error}</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      <NavBar />
      <main className="flex-1 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-background rounded-xl shadow-lg p-8 border">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-semibold text-center mb-8">Grades Submitted Successfully!</h1>
          
          {/* Student Profile Section */}
          {userData && userData.grades && (
            <div className="mb-8 p-6 border rounded-lg bg-muted/30">
              <div className="flex items-center gap-4 mb-4">
                <User className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Student Profile</h2>
              </div>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {userData.name}</p>
                <p><span className="font-medium">School:</span> {userData.grades.school}</p>
                <p><span className="font-medium">Region:</span> {userData.grades.region}</p>
                <p><span className="font-medium">Program:</span> {userData.grades.program}</p>
                <p><span className="font-medium">WASSCE Aggregate:</span> {aggregate}</p>
              </div>
            </div>
          )}

          {/* Qualifying Programs Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <BookOpen className="h-6 w-6" />
              <h2 className="text-xl font-semibold">Qualifying Programs</h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {/* Main Campus Programs */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Main Campus</h3>
                {qualifyingPrograms
                  .filter(program => program.campus === "Main Campus")
                  .map((program, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-semibold">{program.program}</h3>
                      <p className="text-sm text-muted-foreground">
                        Cutoff Point: {program.cutoffPoint}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Your Points: {program.userPoints}
                      </p>
                      <div className={`mt-2 ${program.qualified ? 'text-green-500' : 'text-red-500'}`}>
                        {program.qualified ? 'Qualified' : 'Not Qualified'}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Obuasi Campus Programs */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Obuasi Campus</h3>
                {qualifyingPrograms
                  .filter(program => program.campus === "Obuasi Campus")
                  .map((program, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-semibold">{program.program}</h3>
                      <p className="text-sm text-muted-foreground">
                        Cutoff Point: {program.cutoffPoint}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Your Aggregate: {program.userPoints}
                      </p>
                      <div className={`mt-2 ${program.qualified ? 'text-green-500' : 'text-red-500'}`}>
                        {program.qualified ? 'Qualified' : 'Not Qualified'}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="/register/grades" className="flex-1">
              <Button className="w-full">
                Edit Grades
              </Button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full">
                Continue to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}