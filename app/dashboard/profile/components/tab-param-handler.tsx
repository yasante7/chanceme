"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function TabParamHandler({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Get the tab from URL query parameters
    const tabParam = searchParams.get("tab")
    if (tabParam && ["personal", "academic", "preferences", "security"].includes(tabParam)) {
      onTabChange(tabParam)
    }
  }, [searchParams, onTabChange])
  
  return null
}
