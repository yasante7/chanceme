'use client'

import { useEffect, useState } from 'react'
import { GradeData } from '@/types/user'
import { calculateQualifyingPrograms } from '@/utils/program-checker'

interface LogEntry {
  type: 'info' | 'error' | 'success'
  message: string
  timestamp: Date
}

export default function ProgressPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [qualifyingPrograms, setQualifyingPrograms] = useState<any[]>([])

  useEffect(() => {
    // Override console.log to capture logs
    const originalConsoleLog = console.log
    const originalConsoleError = console.error

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

    // Get grade data from localStorage
    const gradeData = localStorage.getItem('gradeData')
    if (gradeData) {
      const parsedData: GradeData = JSON.parse(gradeData)
      const results = calculateQualifyingPrograms(parsedData)
      setQualifyingPrograms(results)
      
      // Add success log
      setLogs(prev => [...prev, {
        type: 'success',
        message: `Found ${results.length} qualifying programs`,
        timestamp: new Date()
      }])
    }

    setIsLoading(false)

    // Cleanup
    return () => {
      console.log = originalConsoleLog
      console.error = originalConsoleError
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Program Checker Progress</h1>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Processing your results...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Results Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Results Summary</h2>
              <p className="text-gray-700">
                Found {qualifyingPrograms.length} qualifying programs
              </p>
            </div>

            {/* Logs */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Processing Logs</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded ${
                      log.type === 'error'
                        ? 'bg-red-50 text-red-700'
                        : log.type === 'success'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-sm">{log.message}</span>
                      <span className="text-xs text-gray-500">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualifying Programs */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Qualifying Programs</h2>
              <div className="space-y-4">
                {qualifyingPrograms.map((program, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <h3 className="font-medium text-lg">{program.program}</h3>
                    <p className="text-gray-600">{program.college}</p>
                    <p className="text-sm text-gray-500">{program.campus}</p>
                    {program.specialRequirements && (
                      <p className="text-sm text-blue-600 mt-1">
                        Note: {program.specialRequirements}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 