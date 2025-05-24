import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"

function ApplicationsPage () {
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

// This is the required Next.js Page export
export default function ApplicationsTabContent() {
  return <ApplicationsPage/>;
}
