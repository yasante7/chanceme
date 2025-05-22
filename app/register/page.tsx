"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, GraduationCap } from "lucide-react"
import { NavBar } from "@/components/nav-bar"
import { Input } from "@/components/ui/input"
import { validateEmail } from "../components/load-user-data"
import { Gender, Region, REGIONS } from "../components/load-user-data"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(50)

  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "" as Gender,
    phone: "",
    region: "" as Region,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState("")

useEffect(() => {
  setProgress((step / 2) * 100)
}, [step])


  // Load saved data when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('userData')
    if (savedData) {
      try {
        const userData = JSON.parse(savedData)
        // Only load registration data, not grades
        if (userData.name && !userData.grades) {
          setFormData({
            name: userData.name || "",
            email: userData.email || "",
            password: userData.password || "",
            dateOfBirth: userData.dateOfBirth || "",
            gender: userData.gender || "",
            phone: userData.phone || "",
            region: userData.region || "",
          })
        }
        
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setEmailError("")

    try {
      const formatError = validateEmail(formData.email)
      if (formatError) {
        setEmailError(formatError)
        return
      }

      // Store registration data in localStorage
      localStorage.setItem('userData', JSON.stringify(formData))
      console.log('Registration data saved:', formData)
      
      router.push("/register/success")
      
    } catch (error: unknown) {
      // Replace 'any' with 'unknown' for better type safety
      console.error("Error signing up:", error)
      
      // Handle the error with proper type narrowing
      if (error instanceof Error) {
        setError(`Error signing up: ${error.message}`)
      } else {
        setError("Error signing up. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      <NavBar />
        <main className="flex-1 px-6 pt-32 pb-6 flex items-start justify-center">
        <div className="max-w-md w-full bg-background rounded-xl shadow-lg p-8 border">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="h-10 w-10" />
          </div>
          <div className="flex items-center justify-center mb-6">
            <Progress value={progress} />
          </div>
          <h1 className="text-2xl font-semibold text-center mb-8">Create Your Account</h1>
            {step === 1 && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-muted-foreground">
                  Full Name
                </label>
                <Input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="region" className="block text-sm font-medium mb-2 text-muted-foreground">
                  Region of Residence
                </label>
                <select
                  id="region"
                  className="w-full p-2 rounded-md border bg-background"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value as Region })}
                  required
                >
                  <option value="">Select Region</option>
                  {REGIONS.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Gender
                  </label>
                  <select
                    id="gender"
                    className="w-full p-2 rounded-md border bg-background"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full" type="button">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <Button type="button" className="flex-1" onClick={() => setStep(2)}>
                  Next
                </Button>
              </div>
            </>
            )}

            {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g., 024XXXXXXX"
                    required
                  />
                </div>
                            
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      setEmailError("")
                    }}
                    required
                    className={emailError ? "border-red-500" : ""}
                  />
                  {emailError && (
                    <p className="text-sm text-red-500 mt-1">{emailError}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Password
                  </label>
                  <Input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <Button type="button" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
              </> 
            </form>
          )}
          
          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}
          
          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
