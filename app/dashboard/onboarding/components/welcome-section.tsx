'use client'
import { Button } from "@/components/ui/button"
import { GraduationCap, ArrowRight } from "lucide-react"
import { useUserData } from "@/hooks/fetchUser"

export default function WelcomeSection() {
  const { firstname } = useUserData()

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-center">
        <div className="flex-1 text-white mb-8 md:mb-0">
          <h1 className="text-3xl font-bold mb-4">{`Hi ${firstname}, Welcome to UniMatch Ghana!`}</h1>
          <p className="text-blue-100 mb-6 max-w-lg">
            You&apos;re just a few steps away from discovering university programs that match your WASSCE results. Let&apos;s get
            started by entering your grades.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" onClick={() => window.location.href = '/dashboard/onboarding/grades'}>
            Enter Your WASSCE Grades
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="flex-shrink-0 flex justify-center">
          <div className="bg-white/20 p-6 rounded-full">
            <GraduationCap className="h-24 w-24 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}
