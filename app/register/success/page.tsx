"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { CheckCircle } from "lucide-react"
// import { NavBar } from "@/components/nav-bar"

export default function RegistrationSuccessPage() {
  const supabase = createClientComponentClient()
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    // Try to get the currently authenticated user
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setIsVerified(true)
        setTimeout(() => window.close(), 3000)
      }
    }

    checkAuth()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      {/* <NavBar /> */}
      <main className="flex-1 p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-background rounded-xl shadow-lg p-8 border text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-semibold mb-4">Account Created Successfully!</h1>
          <p className="text-muted-foreground mb-6">
            Your account has been created. Kindly check your email for verification instructions.
          </p>

          {isVerified && (
            <p className="text-green-600 font-medium">
              ✅ Email verified. You may now close this tab.
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
