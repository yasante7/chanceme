import { Calendar, Clock } from "lucide-react"

export function UpcomingDeadlines() {
  const deadlines = [
    {
      university: "UC Berkeley",
      program: "Computer Science",
      deadline: "Dec 1, 2023",
      daysLeft: 5,
      priority: "high",
    },
    {
      university: "UCLA",
      program: "Computer Science",
      deadline: "Dec 5, 2023",
      daysLeft: 9,
      priority: "medium",
    },
    {
      university: "University of Washington",
      program: "Computer Science",
      deadline: "Dec 10, 2023",
      daysLeft: 14,
      priority: "medium",
    },
    {
      university: "University of Texas at Austin",
      program: "Computer Science",
      deadline: "Dec 15, 2023",
      daysLeft: 19,
      priority: "low",
    },
  ]

  return (
    <div className="space-y-4">
      {deadlines.map((deadline, index) => (
        <div
          key={index}
          className={`flex items-start space-x-3 rounded-lg border p-3 ${
            deadline.priority === "high"
              ? "border-red-200 bg-red-50"
              : deadline.priority === "medium"
                ? "border-yellow-200 bg-yellow-50"
                : ""
          }`}
        >
          <div className="flex-shrink-0">
            <Calendar
              className={`h-5 w-5 ${
                deadline.priority === "high"
                  ? "text-red-500"
                  : deadline.priority === "medium"
                    ? "text-yellow-500"
                    : "text-muted-foreground"
              }`}
            />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{deadline.university}</h3>
              <div className="flex items-center text-xs">
                <Clock className="mr-1 h-3 w-3" />
                <span
                  className={`${
                    deadline.daysLeft <= 7
                      ? "text-red-500 font-medium"
                      : deadline.daysLeft <= 14
                        ? "text-yellow-500"
                        : "text-muted-foreground"
                  }`}
                >
                  {deadline.daysLeft} days left
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{deadline.program}</p>
            <p className="text-xs">Due: {deadline.deadline}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
