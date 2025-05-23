import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"

export function TimelineTabContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Timeline</CardTitle>
        <CardDescription>Important dates and deadlines</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Your application timeline will appear here.</p>
      </CardContent>
    </Card>
  )
}
