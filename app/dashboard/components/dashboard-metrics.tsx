import { CheckCircle, PieChart, Calendar, Clock, MessageSquare } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function DashboardMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">85%</div>
          <Progress value={85} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Complete your profile to get better recommendations
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Applications</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3/8</div>
          <Progress value={37.5} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">3 submitted, 5 in progress</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">4</div>
          <div className="flex items-center mt-2">
            <Clock className="mr-1 h-3 w-3 text-orange-500" />
            <span className="text-xs text-orange-500">Nearest: 5 days</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Stanford, MIT, Berkeley, UCLA</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Messages</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2</div>
          <div className="flex items-center mt-2">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
            <span className="text-xs text-muted-foreground">2 unread</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">From admission counselors</p>
        </CardContent>
      </Card>
    </div>
  )
}
