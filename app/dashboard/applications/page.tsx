import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"

export function ApplicationsTabContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Applications</CardTitle>
        <CardDescription>Track and manage your university applications</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Your application details will appear here.</p>
      </CardContent>
    </Card>
  )
}

export default ApplicationsTabContent;
