import type { Metadata } from "next"
import { WelcomeSection } from "./components/welcome-section"
import { DashboardTabs } from "./components/dashboard-tabs"
import { Footer } from "../components/footer"

export const metadata: Metadata = {
  title: "Dashboard | UniMatch",
  description: "University admission recommendation dashboard",
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <WelcomeSection />
      <DashboardTabs />
      < Footer />
    </div>
  )
}
