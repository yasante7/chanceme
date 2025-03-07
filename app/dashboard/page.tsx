"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Grid, User, GraduationCap, School, BookOpen } from "lucide-react"
import { NavBar } from "@/components/nav-bar"

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      {/* Dashboard Content */}
      <div className="flex-1 bg-blue-900 dark:bg-blue-950">
        {/* Secondary Header */}
        <header className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="rounded-full p-2">
              <User className="h-6 w-6 text-white" />
            </button>
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          </div>
          <button className="rounded-full p-2">
            <Grid className="h-6 w-6 text-white" />
          </button>
        </header>

        {/* Main Content */}
        <main className="px-4 py-6">
          {/* Getting Started Widget */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 mb-6">
            <h2 className="text-sm font-medium text-gray-500 mb-4">GETTING STARTED</h2>
            <h3 className="text-2xl font-bold mb-6">Jane, let's complete your academic profile</h3>
            
            {/* Progress Bar */}
            <div className="relative h-2 bg-gray-200 rounded-full mb-8">
              <div className="absolute left-0 top-0 h-full w-1/3 bg-pink-500 rounded-full" />
            </div>

            {/* Setup Tasks */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">📚</span>
                  <span className="text-lg line-through text-gray-400">Add your grades</span>
                </div>
                <div className="h-6 w-6 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white">✓</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🎓</span>
                  <span className="text-lg">Select preferred universities</span>
                </div>
                <div className="h-6 w-6 rounded-full bg-gray-200" />
              </div>

              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🎯</span>
                  <span className="text-lg">Choose program interests</span>
                </div>
                <div className="h-6 w-6 rounded-full bg-gray-200" />
              </div>

              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">📋</span>
                  <span className="text-lg">Complete requirements checklist</span>
                </div>
                <div className="h-6 w-6 rounded-full bg-gray-200" />
              </div>
            </div>

            <button className="text-blue-500 mt-6">Hide this widget</button>
          </div>

          {/* Program Recommendations */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Your Top Program Matches</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">BSc. Computer Science</h3>
                  <span className="text-green-500">98% Match</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">University of Ghana</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm">Apply Now</Button>
                </div>
              </div>
              {/* Add more program recommendations */}
            </div>
          </div>

          {/* Grade Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-4">Your Grade Summary</h2>
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
    </div>
  )
} 