import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, HelpCircle } from "lucide-react"

export default function GettingStartedGuide() {
  const steps = [
    {
      title: "Create Account",
      description: "You've successfully created your account",
      status: "completed",
      icon: CheckCircle2,
    },
    {
      title: "Enter WASSCE Grades",
      description: "Add your subject grades to get matched",
      status: "current",
      icon: Circle,
      action: "Enter Grades",
    },
    {
      title: "Review Recommendations",
      description: "Explore programs that match your grades",
      status: "pending",
      icon: Circle,
    },
    {
      title: "Save Favorites",
      description: "Bookmark programs you're interested in",
      status: "pending",
      icon: Circle,
    },
    {
      title: "Apply to Programs",
      description: "Submit applications to chosen universities",
      status: "pending",
      icon: Circle,
    },
  ]

  return (
    <Card className="border-none shadow-lg">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white">
        <h3 className="font-bold text-lg">Getting Started</h3>
        <p className="text-sm text-gray-300 mt-1">Complete these steps to find your perfect program</p>
      </div>

      <CardContent className="p-6">
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div
                className={`p-1 rounded-full flex-shrink-0 ${
                  step.status === "completed"
                    ? "text-green-600 dark:text-green-500"
                    : step.status === "current"
                      ? "text-blue-600 dark:text-blue-500"
                      : "text-gray-400"
                }`}
              >
                <step.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{step.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{step.description}</p>

                {step.action && step.status === "current" && (
                  <div className="mt-2">
                    <Button variant="outline" size="sm" className="text-xs h-8 w-full">
                      {step.action}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Button className="w-full" size="sm" variant="outline">
            <HelpCircle className="h-4 w-4 mr-2" />
            Need Help Getting Started?
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
