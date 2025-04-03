"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"
import { NavBar } from "@/components/nav-bar"

export default function GradesSuccessPage() {
  const [qualifyingPrograms, setQualifyingPrograms] = useState<any[]>([])

  useEffect(() => {
    const programs = localStorage.getItem('qualifyingPrograms')
    if (programs) {
      setQualifyingPrograms(JSON.parse(programs))
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      <NavBar />
      <main className="flex-1 p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-background rounded-xl shadow-lg p-8 border text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-semibold mb-4">Grades Submitted Successfully!</h1>
          
          <div className="my-8">
            <h2 className="text-xl font-semibold mb-4">Qualifying Programs</h2>
            <div className="space-y-4">
              {qualifyingPrograms.map((program, index) => (
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
          </div>

          <Link href="/dashboard">
            <Button className="w-full">
              Continue to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}