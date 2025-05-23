import { CheckCircle, Circle, Clock } from "lucide-react"

export function ApplicationTimeline() {
  const applications = [
    {
      university: "Stanford University",
      program: "Computer Science",
      status: "submitted",
      date: "Oct 15, 2023",
      nextStep: "Interview scheduled for Nov 10",
    },
    {
      university: "MIT",
      program: "Computer Science",
      status: "submitted",
      date: "Oct 20, 2023",
      nextStep: "Awaiting review",
    },
    {
      university: "UC Berkeley",
      program: "Computer Science",
      status: "in-progress",
      date: "Due: Dec 1, 2023",
      nextStep: "Complete personal statement",
    },
    {
      university: "Georgia Tech",
      program: "Computer Science",
      status: "submitted",
      date: "Oct 5, 2023",
      nextStep: "Awaiting decision",
    },
  ]

  return (
    <div className="space-y-4">
      {applications.map((app, index) => (
        <div key={index} className="flex gap-3">
          <div className="flex flex-col items-center">
            {app.status === "submitted" ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : app.status === "in-progress" ? (
              <Clock className="h-5 w-5 text-yellow-500" />
            ) : (
              <Circle className="h-5 w-5 text-gray-300" />
            )}
            {index < applications.length - 1 && <div className="h-full w-px bg-border" />}
          </div>
          <div className="space-y-1 pb-4">
            <div className="font-medium">{app.university}</div>
            <div className="text-xs text-muted-foreground">{app.program}</div>
            <div className="text-xs">{app.date}</div>
            <div className="text-xs text-muted-foreground">{app.nextStep}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
