"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { UserCircle } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()

  return (
    <div className="container mx-auto max-w-md p-6">
      <div className="flex flex-col items-center space-y-8">
        <UserCircle className="h-24 w-24 text-primary" />
        <h1 className="text-3xl font-bold text-center">Welcome to ChanceMe</h1>
        <p className="text-center text-gray-500 max-w-sm">
          Create an account to predict your university admission chances or sign in to your existing account
        </p>
        
        <div className="flex flex-col w-full gap-4">
          <Button 
            size="lg"
            className="w-full"
            onClick={() => router.push('/register')}
          >
            Create Account
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="w-full"
            onClick={() => router.push('/login')}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  )
} 