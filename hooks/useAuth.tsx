import { useEffect, useState } from 'react'

// Define a simple User type to replace Supabase's User
export type User = {
  email: string;
  id: string;
  isLoggedIn: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get current session from localStorage
    const loadSession = () => {
      try {
        const sessionData = localStorage.getItem('userSession')
        if (sessionData) {
          const userData = JSON.parse(sessionData)
          setUser({
            email: userData.email,
            id: userData.email, // Use email as ID for simplicity
            isLoggedIn: true
          })
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error loading session from localStorage:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    // Only run in browser environment
    if (typeof window !== 'undefined') {
      loadSession()
      
      // Listen for changes in localStorage
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'userSession') {
          loadSession()
        }
      }
      
      window.addEventListener('storage', handleStorageChange)
      return () => window.removeEventListener('storage', handleStorageChange)
    } else {
      setLoading(false)
    }
  }, [])

  return {
    user,
    loading,
    signUp: async (email: string, password: string) => {
      if (!email || !password) {
        throw new Error('Email and password are required')
      }
      
      const userData = {
        email,
        isLoggedIn: true,
        createdAt: new Date().toISOString()
      }
      
      localStorage.setItem('userSession', JSON.stringify(userData))
      
      setUser({
        email,
        id: email,
        isLoggedIn: true
      })
    },
    signIn: async (email: string, password: string) => {
      if (!email || !password) {
        throw new Error('Email and password are required')
      }
      
      const userData = {
        email,
        isLoggedIn: true,
        lastLoginAt: new Date().toISOString()
      }
      
      localStorage.setItem('userSession', JSON.stringify(userData))
      
      setUser({
        email,
        id: email,
        isLoggedIn: true
      })
    },
    signOut: async () => {
      localStorage.removeItem('userSession')
      setUser(null)
    }
  } as const
}