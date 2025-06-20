import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, HelpCircle } from "lucide-react"

export default function NextSteps() {
  const steps = [
    {
      title: "Review Recommendations",
      description: "Check your matched programs",
      status: "completed",
      icon: CheckCircle,
    },
    {
      title: "Research Universities",
      description: "Learn about campus life and facilities",
      status: "current",
      icon: Circle,
    },
    {
      title: "Prepare Applications",
      description: "Gather required documents",
      status: "pending",
      icon: Circle,
    },
    {
      title: "Submit Applications",
      description: "Apply before deadlines",
      status: "pending",
      icon: Circle,
    },
  ]

  return (
    <Card className="border-none shadow-lg">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white">
        <h3 className="font-bold text-lg">Your Application Journey</h3>
        <p className="text-sm text-gray-300 mt-1">Track your progress</p>
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

                {step.status === "current" && (
                  <div className="mt-2">
                    <Button variant="outline" size="sm" className="text-xs h-8 w-full">
                      Start Research
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
            Get Application Help
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
