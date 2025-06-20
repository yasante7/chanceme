"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Circle } from "lucide-react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { REGIONS, validateEmail } from "../../../components/load-user-data"
import { Gender, Region } from "@/types/user"
import { ThirdPartyProviders } from "./sign-in-providers"

// import { CardFooter } from "@/components/ui/card"

export function SignupForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [agree, setAgree] = useState(false)
  const [message, setMessage] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "" as Gender,
    region: "" as Region,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [, setError] = useState<string | null>(null)
  const [, setEmailError] = useState("")

  // Save both formData and step on every change
  useEffect(() => {
    localStorage.setItem('signupFormData', JSON.stringify({ ...formData, step }))
  }, [formData, step])

  // Restore both on mount
  useEffect(() => {
    const saved = localStorage.getItem('userData')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setFormData({
          firstName: parsed.firstName || "",
          lastName: parsed.lastName || "",
          email: parsed.email || "",
          password: parsed.password || "",
          dateOfBirth: parsed.dateOfBirth || "",
          gender: parsed.gender || "",
          region: parsed.region || "",
        })
        if (parsed.step) setStep(parsed.step)
      } catch (error) {
        console.error('Error loading saved data:', error)
        // handle error
      }
    }
  }, [])

  const handleCheckboxChange = (checked: boolean | string) => {
    if (checked && !agree) {
      setIsAnimating(true);
      setAgree(true);
      setIsAnimating(false);
      
    } else if (!checked && agree) {
      setAgree(false);
    }
  };

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setEmailError("")
    setMessage("")

    // ✅ Check agreement FIRST before any other validation
    if (!agree) {
      setMessage("You must agree to the terms to continue.")
      setIsSubmitting(false)
      return
    }

    try {
      const formatError = validateEmail(formData.email)
      if (formatError) {
        setEmailError(formatError)
        setIsSubmitting(false)
        return
      }

      // Store registration data in localStorage
      localStorage.setItem('userData', JSON.stringify(formData))
      localStorage.removeItem('signupFormData')
      console.log('Registration data saved:', formData)
      
      // ✅ Use Supabase Auth to sign up the user
      const { error, data } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: "https://chanceme-olive.vercel.app/register/get-started",
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      })
      
      // Log to check the response
      console.log("Signup response:", data)

      if (error) {
        if (error.message.includes("already registered") || 
            error.message.includes("User already registered")) {
          setMessage("Email already registered. Please log in.")
        } else {
          setMessage(`Error: ${error.message}`)
        }
        setIsSubmitting(false)
      } else {
        // Check if user was created successfully
        if (data.user) {
          router.push("../register/success")
          setMessage("Signup successful! Your account has been created.")
          console.log("User metadata:", data.user.user_metadata)
        } else {
          setMessage("Account created, but user data couldn't be set. Please contact support.")
          setIsSubmitting(false)
        }
      }
    } catch (error: unknown) {
      console.error("Error signing up:", error)
      
      if (error instanceof Error) {
        setMessage(`Error signing up: ${error.message}`)
      } else {
        setMessage("Error signing up. Please try again.")
      }
      setIsSubmitting(false)
    }
  }

  return (
    <div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              value={formData.firstName}
              onChange={handleChange("firstName")}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              value={formData.lastName}
              onChange={handleChange("lastName")}
              placeholder="Enter your last name"
              required
            />
          </div>
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange("password")}
                placeholder="Create a password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">{showPassword ? "Hide" : "Show"} password</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Password must be at least 6 characters and include a number and a special character.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Checkbox
                id="terms"
                checked={agree}
                onCheckedChange={handleCheckboxChange}
                disabled={isAnimating}
                className={`${isAnimating ? "opacity-0" : "opacity-100 transition-opacity duration-200"} ${!agree && message?.includes("agree") ? "ring-2 ring-red-500" : ""}`}
              />
              {isAnimating && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center text-primary"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, ease: "linear" }}
                >
                  <Circle className="h-4 w-4 animate-spin" />
                </motion.div>
              )}
            </div>
            <Label 
              htmlFor="terms" 
              className={`text-sm font-normal ${!agree && message?.includes("agree") ? "text-red-500" : ""}`}
            >
              I agree to receive emails about university recommendations and application deadlines
            </Label>
          </div>

          {/* Show the error message more prominently when agree is required */}
          {message && (
            <p className={`text-sm mt-2 ${message.includes("agree") ? "text-red-500 font-medium" : "text-muted-foreground"}`}>
              {message}
            </p>
          )}

          <div className="flex gap-4 pt-6">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </Button>
          </div>

          {message && <p className="text-sm text-muted-foreground">{message}</p>}

          {/* <CardFooter className="flex flex-col space-y-4 border-t bg-muted/30 px-6 py-4 text-center">
            <p className="text-sm text-muted-foreground">
              By continuing, you agree to our{" "}
              <a href="#" className="underline hover:text-primary">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-primary">
                Privacy Policy
              </a>
              .
            </p>
          </CardFooter> */}
          <div>
            <ThirdPartyProviders />
          </div>
        </form>
    </div>
  )
}
