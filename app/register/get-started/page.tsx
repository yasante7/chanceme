"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Navbar } from "../../components/navbar"
// import { NavBar } from "@/components/nav-bar"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { SignupForm } from "./components/signup-form"
import { LoginForm } from "./components/login-form"

export default function GetStartedPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>("login")

  return (
    <div>
      <Navbar />
      <main className="container flex flex-1 items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mx-auto w-full max-w-md border-none shadow-2xl rounded-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-300 to-white bg-clip-text text-transparent">
                {activeTab === "signup" ? "Create Account" : "Welcome Back"}
              </CardTitle>
              <CardDescription className="mt-2 text-muted-foreground">
                {activeTab === "signup"
                  ? "Sign up to start your journey to the perfect university"
                  : "Log in to access your dashboard and recommendations"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted rounded-xl mb-4">
                  <TabsTrigger value="login" className="rounded-xl text-sm">
                    Log In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="rounded-xl text-sm">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signup">
                  <SignupForm />
                </TabsContent>

                <TabsContent value="login">
                  <LoginForm onSuccess={() => router.push("/dashboard")} />
                </TabsContent>
              </Tabs>
            </CardContent>


          </Card>
        </motion.div>
      </main>
    </div>
  )
}
