"use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { supabase } from "@/lib/supabase"
import { DashboardHeader } from "./components/dashboard-header"
import { DashboardSidebar } from "./components/sidebar/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  /*
  const router = useRouter()
  

  useEffect(() => {
    // Check if the user is authenticated
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error || !session) {
        // Redirect to login page if not authenticated
        router.push("/get-started")
      }
    }
    
    checkAuth()
  }, [router])
  */
  return (
    <div className="flex min-h-screen flex-col">      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 md:ml-64 p-6 pt-0">
          {children}
        </main>
      </div>
    </div>
  )
}
