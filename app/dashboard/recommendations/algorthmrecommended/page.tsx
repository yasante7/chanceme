'use client'

import { useEffect, useState } from 'react'
import { calculateQualifyingPrograms } from '@/utils/program-checker'
import { ProgramResult } from '@/utils/program-checker'
import { CheckCircle, AlertCircle, Loader2, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface LogEntry {
  type: 'info' | 'error' | 'success' | 'debug'
  message: string
  timestamp: Date
}

export default function ProgressPage() {
  // We'll use logs with the toggle functionality
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [qualifyingPrograms, setQualifyingPrograms] = useState<ProgramResult[]>([])
  const [progress, setProgress] = useState(0)
  const [hasError, setHasError] = useState(false)
  const [showLogs, setShowLogs] = useState(false) // Add toggle state
  const router = useRouter()

  useEffect(() => {
    // Add initial test log

    // clear console on window load
    // console.clear()
    setLogs(prev => [...prev, {
      type: 'info',
      message: 'Starting program checker...',
      timestamp: new Date()
    }])

    // Override console.log to capture logs
    const originalConsoleLog = console.log
    const originalConsoleError = console.error
    const originalConsoleDebug = console.debug

    console.log = (...args) => {
      originalConsoleLog(...args)
      setLogs(prev => [...prev, {
        type: 'info',
        message: args.join(' '),
        timestamp: new Date()
      }])
    }

    console.error = (...args) => {
      originalConsoleError(...args)
      setLogs(prev => [...prev, {
        type: 'error',
        message: args.join(' '),
        timestamp: new Date()
      }])
    }

    console.debug = (...args) => {
      originalConsoleDebug(...args)
      setLogs(prev => [...prev, {
        type: 'debug',
        message: args.join(' '),
        timestamp: new Date()
      }])
    }

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90))
    }, 500)

    try {
      // Get user data from localStorage
      const userData = localStorage.getItem('userData')
      if (userData) {
        const parsedData = JSON.parse(userData)
        
        if (parsedData.grades) {
          const results = calculateQualifyingPrograms(parsedData.grades)
          console.log('Program checker results:', JSON.stringify(results, null, 2))
          setQualifyingPrograms(results)
        } else {
          console.error('No grades found in user data')
          setHasError(true)
        }
      } else {
        console.error('No user data found in localStorage')
        setHasError(true)
      }
    } catch (error) {
      console.error('Error processing user data:', error)
      setHasError(true)
    }

    // Complete progress
    setTimeout(() => {
      clearInterval(progressInterval)
      setProgress(100)
      setIsLoading(false)
    }, 2000)

    // Cleanup
    return () => {
      console.log = originalConsoleLog
      console.error = originalConsoleError
      console.debug = originalConsoleDebug
      clearInterval(progressInterval)
    }
  }, [])

  const handleSaveResults = async (results: ProgramResult[]) => {
    try {
      // Save results to localStorage or send to backend
      localStorage.setItem('qualifyingPrograms', JSON.stringify(results))

      // Save to Supabase or another backend

      const { error: updateError } = await supabase.auth.updateUser({
        data: { qualifyingPrograms: JSON.stringify(results) }
      });    
      if (updateError) throw updateError
    
      // Alert the user of success
      toast.success('Programs saved successfully! Redirecting to dashboard...')
      console.log('Results saved successfully')
    } catch (error) {
      console.error('Error saving results:', error)
    }
    // Redirect to success page
    setTimeout(() => {
      router.push('/dashboard')  
    }, 3000);
    
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      <main className="flex-1 pt-24 md:pt-28 p-6 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-background rounded-xl shadow-lg p-8 border">
          <h1 className="text-2xl font-semibold text-center mb-8">Processing Your Results</h1>
          
          {isLoading ? (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Analyzing your grades...</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Loading Spinner */}
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            </div>
          ) : hasError ? (
            <div className="text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
              <h2 className="text-xl font-semibold text-red-600">Error Processing Grades</h2>
              <p className="text-muted-foreground">
                Please go back and enter your grades again.
              </p>
              <Link href="/app/register/grades/gradescomponent">
                <Button variant="outline">
                  Back to Grades
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Results Summary */}
              <div className="p-6 border rounded-lg bg-muted/30">
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <h2 className="text-xl font-semibold">Results Summary</h2>
                </div>
                <p className="text-muted-foreground">
                  Found {qualifyingPrograms.length} qualifying programs
                </p>
              </div>

              {/* Processing Logs - Toggle Now Using the logs state */}
              <div className="p-6 border rounded-lg bg-muted/30">
                <button 
                  onClick={() => setShowLogs(!showLogs)} 
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <AlertCircle className="h-6 w-6 text-blue-500" />
                    <h2 className="text-xl font-semibold">Processing Logs</h2>
                  </div>
                  {showLogs ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                
                {showLogs && (
                  <div className="space-y-2 max-h-96 overflow-y-auto font-mono text-sm mt-4">
                    {logs.map((log, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded ${
                          log.type === 'error'
                            ? 'bg-red-50 text-red-700'
                            : log.type === 'success'
                            ? 'bg-green-50 text-green-700'
                            : log.type === 'debug'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span>{log.message}</span>
                          <span className="text-xs text-muted-foreground">
                            {log.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Qualifying Programs */}
              <div className="p-6 border rounded-lg bg-muted/30">
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <h2 className="text-xl font-semibold">Qualifying Programs</h2>
                </div>
                <div className="space-y-4">
                  {qualifyingPrograms.map((program, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <h3 className="font-medium text-lg">{program.program}</h3>
                      <p className="text-muted-foreground">{program.college}</p>
                      <p className="text-sm text-muted-foreground">{program.campus}</p>
                      {program.specialRequirements && (
                        <p className="text-sm text-blue-600 mt-1">
                          CutoffPoint: {program.cutoffPoint} | Applicant&apos;s Aggregate: {program.Aggregate}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Link href="/app/register/grades/page" className="flex-1">
              <Button variant="outline" className="w-full">
                Edit Grades
              </Button>
            </Link>
            <Button className="w-full flex-1" onClick={() => handleSaveResults (qualifyingPrograms)}>
              Save Results
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}