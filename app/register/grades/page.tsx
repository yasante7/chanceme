"use client"
import { retrieveUserData, createGradesRecord, extractElectives } from '@/utils/retrieve-restore-data'
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, GraduationCap } from "lucide-react"
// import { supabase } from '@/lib/supabase'  // Comment out this line
import { useRouter } from 'next/navigation'
import { NavBar } from "@/components/nav-bar"
import { GradeData, UserData } from "@/types/user"
import schoolsData from '@/src/data/schools_loc_data.json'  // Add this import
import { PROGRAMS, PROGRAM_SUBJECTS, CORE_SUBJECTS, GRADES } from "@/components/constants/student-grades"

type Grade = string;
export default function GradesPage() {
  const router = useRouter()
  const [selectedProgram, setSelectedProgram] = useState<string>('')
  const [selectedElectives, setSelectedElectives] = useState<string[]>(['', '', '', ''])
  const [grades, setGrades] = useState<Record<string, Grade>>({})
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [selectedSchool, setSelectedSchool] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const userData = retrieveUserData()
    if (userData?.grades) {
      const { program, school, region } = userData.grades
      
      // Set program, region and school
      setSelectedProgram(program)
      setSelectedRegion(region)
      setSelectedSchool(school)
      
      // Set grades and electives
      setGrades(createGradesRecord(userData))
      setSelectedElectives(extractElectives(userData))
    }
  }, [])

  // Get unique regions from schools data
  const regions = Array.from(new Set(schoolsData.map(school => school.Region).sort()))

  // Get schools for selected region
  const getSchoolsForRegion = (region: string) => {
    return schoolsData.filter(school => school.Region === region).map(school => school["School Name"]).sort()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    const gradeData: GradeData = {
      program: selectedProgram,
      school: selectedSchool,
      region: selectedRegion,
      core_subjects: CORE_SUBJECTS.map(subject => ({
        subject,
        grade: grades[subject]
      })),
      elective_subjects: selectedElectives.filter(Boolean).map(subject => ({
        subject,
        grade: grades[subject]
      }))      
    }

    try {
      // Get existing registration data
      const existingData = localStorage.getItem('userData')
      if (!existingData) {
        throw new Error('Registration data not found')
      }

      // Combine registration and grade data
      const userData: UserData = {
        ...JSON.parse(existingData),
        grades: gradeData
      }

      // Store complete user data
      localStorage.setItem('userData', JSON.stringify(userData))

      // Navigate to progress page
      router.push("/register/grades/progress")
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save grades'
      setError(errorMessage)
      console.error('Error details:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGradeChange = (subject: string, grade: Grade) => {
    setGrades(prev => ({
      ...prev,
      [subject]: grade
    }))
  }

  const handleElectiveChange = (index: number, subject: string) => {
    setSelectedElectives(prev => {
      const newElectives = [...prev]
      newElectives[index] = subject
      return newElectives
    })
  }

  const getAvailableElectives = (currentIndex: number) => {
    if (!selectedProgram) return []
    const programElectives = PROGRAM_SUBJECTS[selectedProgram as keyof typeof PROGRAM_SUBJECTS]
    return programElectives.filter(
      subject => !selectedElectives.includes(subject) || selectedElectives[currentIndex] === subject
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      <NavBar />
      <main className="flex-1 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-background rounded-xl shadow-lg p-8 border">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-semibold text-center mb-8">Enter Your Grades</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Region Selection */}
            <div>
              <label htmlFor="region" className="block text-sm font-medium mb-2 text-muted-foreground">
                Select Your School Region
              </label>
              <select
                id="region"
                className="w-full p-2 rounded-md border bg-background"
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value)
                  setSelectedSchool('')
                }}
                required
              >
                <option value="">Select a region...</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* School Selection */}
            {selectedRegion && (
              <div>
                <label htmlFor="school" className="block text-sm font-medium mb-2 text-muted-foreground">
                  Select Your School
                </label>
                <select
                  id="school"
                  className="w-full p-2 rounded-md border bg-background"
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  required
                >
                  <option value="">Select a school...</option>
                  {getSchoolsForRegion(selectedRegion).map((school) => (
                    <option key={school} value={school}>
                      {school}
                    </option>
                  ))}
                </select>
              </div>
            )}
              {/* Program Selection */}
              <div>
              <label htmlFor="program" className="block text-sm font-medium mb-2 text-muted-foreground">
                Select Your Program
              </label>
              <select
                id="program"
                className="w-full p-2 rounded-md border bg-background"
                value={selectedProgram}
                onChange={(e) => {
                  setSelectedProgram(e.target.value)
                  setSelectedElectives(['', '', '', ''])
                  setGrades({})
                }}
                required
              >
                <option value="">Select a program...</option>
                {PROGRAMS.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>

            {/* Core Subjects */}
            <div>
              <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Core Subjects</h2>
              <div className="space-y-4">
                {CORE_SUBJECTS.map((subject) => (
                  <div key={subject} className="flex items-center gap-4">
                    <label className="flex-1 text-sm font-medium text-muted-foreground">{subject}</label>
                    <select
                      className="w-24 p-2 rounded-md border bg-background"
                      value={grades[subject] || ''}
                      onChange={(e) => handleGradeChange(subject, e.target.value as Grade)}
                      required
                    >
                      <option value="">Grade</option>
                      {GRADES.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Elective Subjects */}
            {selectedProgram && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Select 4 Elective Subjects</h2>
                <div className="space-y-4">
                  {selectedElectives.map((selectedElective, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <select
                        className="flex-1 p-2 rounded-md border bg-background"
                        value={selectedElective}
                        onChange={(e) => handleElectiveChange(index, e.target.value)}
                        required
                      >
                        <option value="">Select Elective {index + 1}</option>
                        {getAvailableElectives(index).map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                      {selectedElective && (
                        <select
                          className="w-24 p-2 rounded-md border bg-background"
                          value={grades[selectedElective] || ''}
                          onChange={(e) => handleGradeChange(selectedElective, e.target.value as Grade)}
                          required
                        >
                          <option value="">Grade</option>
                          {GRADES.map((grade) => (
                            <option key={grade} value={grade}>
                              {grade}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <Link href="/register" className="flex-1">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <Button 
                type="submit" 
                className="flex-1"
                disabled={selectedElectives.filter(Boolean).length !== 4 || isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Complete Registration'}
              </Button>
            </div>
          </form>
          
          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}
        </div>
      </main>
    </div>
  )
}