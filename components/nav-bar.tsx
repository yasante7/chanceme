"use client"
import { useState } from "react"
import Link from "next/link"
import { GraduationCap, Menu, X, Book, MessageSquare, Phone } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import  Image  from "next/image"


export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 px-6 lg:px-8 h-16 md:h-20 flex items-center border-b bg-background shadow-sm">
      <Link className="flex items-center justify-center" href="/">
        <GraduationCap className="h-7 w-7 mr-3 text-primary" />
        <span className="font-bold text-lg md:text-xl">ChanceMe</span>
      </Link>

      {/* Hamburger button for mobile */}
      <Button
        variant="ghost"
        size="lg"
        className="ml-auto lg:hidden p-2"
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
          "absolute top-[64px] md:top-[80px] left-0 right-0 bg-background border-b lg:border-none shadow-md lg:shadow-none",
          "lg:static lg:ml-auto lg:flex lg:gap-6 lg:items-center",
          isOpen ? "block" : "hidden lg:flex",
        )}
      >
        <div className="flex flex-col lg:flex-row lg:gap-8 p-6 lg:p-0">
          <Link 
            className="flex items-center gap-2 text-base font-medium hover:text-primary transition-colors py-3 lg:py-0" 
            href="#features"
            onClick={() => setIsOpen(false)}
          >
            <Book className="h-4 w-4 lg:hidden" />
            Report Status
          </Link>
          {/* <Link 
            className="flex items-center gap-2 text-base font-medium hover:text-primary transition-colors py-3 lg:py-0" 
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
          >
            <Info className="h-4 w-4 lg:hidden" />
            How It Works
          </Link> */}
          <Link 
            className="flex items-center gap-2 text-base font-medium hover:text-primary transition-colors py-3 lg:py-0" 
            href="#forum"
            onClick={() => setIsOpen(false)}
          >
            <MessageSquare className="h-4 w-4 lg:hidden" />
            Forum
          </Link>
          <Link 
            className="flex items-center gap-2 text-base font-medium hover:text-primary transition-colors py-3 lg:py-0" 
            href="#contact"
            onClick={() => setIsOpen(false)}
          >
            <Phone className="h-4 w-4 lg:hidden" />
            Contact
          </Link>
          <div className="lg:hidden pt-4 mt-2 border-t">
            <Link href="/register/get-started/">
              <Image
                src="/avatars/login.jpg"
                width={24}
                height={24}
                alt="Sign-in image"
                className="h-8 w-8 rounded-full object-cover"
              />
            </Link>

          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/register/get-started/">
            <Image
              src="/avatars/login.jpg"
              width={24}
              height={24}
              alt="Sign-in image"
              className="h-8 w-8 rounded-full object-cover"
            />
          </Link>
          
          <div className="pl-2 border-l h-8 flex items-center">
            <ThemeToggle />
          </div>
        </div>
        
        <div className="p-6 pt-2 lg:hidden">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}