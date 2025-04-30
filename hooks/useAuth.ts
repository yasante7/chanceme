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

    // Load on mount
    if (typeof window !== 'undefined') {
      loadSession()
      
      // Simple event listener for storage changes (e.g., login in another tab)
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

  const signOut = async () => {
    localStorage.removeItem('userSession')
    setUser(null)
  }

  const signUp = async (email: string, password: string) => {
    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }

    // Store in localStorage
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
  }
  
  const signIn = async (email: string, password: string) => {
    // For a real app, you'd validate credentials
    // This just simulates login for development purposes
    
    // Simple validation
    if (!email || !password) {
      throw new Error('Email and password are required')
    }
    
    // Store in localStorage
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
  }

  return { user, loading, signOut, signUp, signIn }
}