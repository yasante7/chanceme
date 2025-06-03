import DashboardHeader from "../components/dashboard-header"
import WelcomeSection from "./components/welcome-section"
import EmptyRecommendations from "./components/empty-recommendations"
import GettingStartedGuide from "./components/getting-started-guide"
import PopularUniversities from "./components/popular-universities"

export default function OnboardingDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <WelcomeSection />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <EmptyRecommendations />
            <PopularUniversities />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <GettingStartedGuide />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
