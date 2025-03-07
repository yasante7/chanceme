"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { NavBar } from "@/components/nav-bar"

export default function RegistrationSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      <NavBar />
      <main className="flex-1 p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-background rounded-xl shadow-lg p-8 border text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-semibold mb-4">Account Created Successfully!</h1>
          <p className="text-muted-foreground mb-8">
            Your account has been created. Please proceed to input your grades and school information.
          </p>
          <Link href="/register/grades">
            <Button className="w-full">
              Continue to Grade Input
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}