'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bell, User, Search, Menu } from "lucide-react"
import { useUserData } from "@/hooks/fetchUser"

export function DashboardHeader() {
  const { firstname } = useUserData()
  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                UniMatch Ghana
              </span>
            </Link>

            <div className="hidden md:flex ml-10 space-x-8">
              <Link
                href="/universities"
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              >
                Universities
              </Link>
              <Link
                href="/programs"
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              >
                Programs
              </Link>
              <Link href="/dashboard" className="text-primary font-medium">
                Dashboard
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-gray-600 dark:text-gray-300">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden md:block">
              <Button variant="outline" size="sm" className="rounded-full">
                <User className="h-4 w-4 mr-2" />
                <span>{firstname}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
