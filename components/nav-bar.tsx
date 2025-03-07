"use client"
import { useState } from "react"
import Link from "next/link"
import { GraduationCap, Menu, X, UserCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleAuthAction = async () => {
    if (user) {
      await signOut()
      router.push('/')
    } else {
      router.push('/login')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 px-4 lg:px-6 h-14 flex items-center border-b bg-background">
      <Link className="flex items-center justify-center" href="/">
        <GraduationCap className="h-6 w-6 mr-2" />
        <span className="font-bold">ChanceMe</span>
      </Link>

      {/* Hamburger button for mobile */}
      <Button
        variant="ghost"
        className="ml-auto lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Navigation items */}
      <nav
        className={cn(
          "absolute top-[56px] left-0 right-0 bg-background border-b lg:border-none",
          "lg:static lg:ml-auto lg:flex lg:gap-4 lg:items-center",
          isOpen ? "block" : "hidden lg:flex",
        )}
      >
        <div className="flex flex-col lg:flex-row lg:gap-6 p-4 lg:p-0">
          <Link 
            className="text-sm font-medium hover:underline underline-offset-4 py-2 lg:py-0" 
            href="#features"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          <Link 
            className="text-sm font-medium hover:underline underline-offset-4 py-2 lg:py-0" 
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
          >
            How It Works
          </Link>
          <Link 
            className="text-sm font-medium hover:underline underline-offset-4 py-2 lg:py-0" 
            href="#forum"
            onClick={() => setIsOpen(false)}
          >
            Forum
          </Link>
          <Link 
            className="text-sm font-medium hover:underline underline-offset-4 py-2 lg:py-0" 
            href="#contact"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <div className="lg:hidden pt-2">
            <Button 
              variant="outline" 
              onClick={handleAuthAction}
            >
              {user ? 'Sign Out' : 'Sign In'}
              <UserCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="hidden lg:block">
          <Button 
            variant="outline" 
            onClick={handleAuthAction}
          >
            {user ? 'Sign Out' : 'Sign In'}
            <UserCircle className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4 lg:p-0">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
} 