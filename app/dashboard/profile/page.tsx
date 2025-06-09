'use client'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, User } from "lucide-react"
import { useUserData } from "@/hooks/fetchUser"
import { useUserGrades } from "@/hooks/fetchGrades"

export default function UserProfile() {
  const { firstname, lastname } = useUserData()
  const { allGradeEntries } = useUserGrades()

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
              <User className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <h3 className="font-bold">{`${firstname} ${lastname}`}</h3>
              <p className="text-sm text-blue-100">WASSCE Graduate</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() =>  window.location.href = "/dashboard/onboarding/grades"}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-4 mt-2">
          <div>
            <p className="text-xs text-blue-100">Aggregate</p>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="h-8 w-px bg-blue-300/30"></div>
          <div>
            <p className="text-xs text-blue-100">Performance</p>
            <p className="text-sm font-medium">Excellent</p>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <h4 className="font-medium text-sm mb-4">WASSCE Results</h4>
        <div className="grid grid-cols-2 gap-y-3 gap-x-6">
          {allGradeEntries.map(entry => (
            <div key={entry.subject} className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">{entry.subject}</span>
              <Badge
                variant={
                  entry.grade.startsWith("A") ? "default" : entry.grade.startsWith("B") ? "secondary" : "outline"
                }
                className={
                  entry.grade.startsWith("A")
                    ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300"
                    : entry.grade.startsWith("B")
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
                      : ""
                }
              >
                {entry.grade}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
