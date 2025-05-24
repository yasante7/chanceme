import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTabContent } from "./overview-tab"
import { RecommendationsTabContent } from "../recommendations/page"
import ApplicationsTabContent from "../applications/applicationspage"
import { TimelineTabContent } from "./timeline-tab"

export function DashboardTabs() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        <TabsTrigger value="applications">Applications</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <OverviewTabContent />
      </TabsContent>

      <TabsContent value="recommendations" className="space-y-4">
        <RecommendationsTabContent />
      </TabsContent>

      <TabsContent value="applications" className="space-y-4">
        <ApplicationsTabContent />
      </TabsContent>

      <TabsContent value="timeline" className="space-y-4">
        <TimelineTabContent />
      </TabsContent>
    </Tabs>
  )
}
