import { LoginForm } from "@/components/auth/login-form"
import { NavBar } from "@/components/nav-bar"

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">
            Sign in to ChanceMe
          </h1>
          <LoginForm />
        </div>
      </main>
    </div>
  )
}