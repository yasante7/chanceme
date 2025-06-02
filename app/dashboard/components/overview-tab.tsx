import { ArrowUpRight, Calendar, UserCircle, Info } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DashboardMetrics } from "./dashboard-metrics"
import RecommendedUniversities from "../universities/universitypage"
import { UpcomingDeadlines } from "./upcoming-deadlines"
import { ApplicationTimeline } from "./application-timeline"
import { AdmissionChances } from "./admission-chances"
import { ProfileCompletionCard } from "./profile-completion-card"
import { ProfileSetupGuide } from "./profile-setup-guide"
import { NextSteps } from "./next-steps"

export function OverviewTabContent() {
  return (
    <div className="space-y-4">
      <Alert variant="default" className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Complete Your Academic Profile</AlertTitle>
        <AlertDescription>
          <p className="mb-2">To receive tailored university recommendations, kindly complete your academic profile with your Wassce scores and educational background.</p>
          <div className="mt-3">
            <Link href="/dashboard/profile">
              <Button size="sm" variant="outline">
                <UserCircle className="mr-2 h-4 w-4" />
                Set Up Your Profile
              </Button>
            </Link>
          </div>
        </AlertDescription>
      </Alert>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-1 lg:col-span-1">
          <NextSteps />
        </div>
        <div className="md:col-span-1 lg:col-span-2">
          <DashboardMetrics />
        </div>
      </div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recommended Universities</CardTitle>
            <CardDescription>Based on your profile and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <RecommendedUniversities />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Recommendations
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>        <div className="flex flex-col gap-4 lg:col-span-3">
          <ProfileCompletionCard />
          <ProfileSetupGuide />
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Don&apos;t miss these important dates</CardDescription>
            </CardHeader>
            <CardContent>
              <UpcomingDeadlines />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Calendar
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Application Timeline</CardTitle>
            <CardDescription>Track your application progress</CardDescription>
          </CardHeader>
          <CardContent>
            <ApplicationTimeline />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Applications
            </Button>
          </CardFooter>
        </Card>

        <AdmissionChances />
      </div>
    </div>
  )
}
