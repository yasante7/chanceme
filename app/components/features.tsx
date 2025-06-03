import { CheckCircle, School, TrendingUp, Users } from "lucide-react"

const features = [
  {
    name: "Accurate Predictions",
    description: "Our algorithm uses historical data to provide precise admission probability estimates.",
    icon: TrendingUp,
  },
  {
    name: "School-Specific Insights",
    description: "Get tailored predictions based on your specific high school&apos;s track record.",
    icon: School,
  },
  {
    name: "Enrolled Student Reporting",
    description: "Current university students can report their status to improve prediction accuracy.",
    icon: Users,
  },
  // {
  //   name: "Community Forum",
  //   description: "Engage with other students, share experiences, and get advice on the admission process.",
  //   icon: MessageSquare,
  // },
  {
    name: "Easy to Use",
    description: "Simple interface for inputting your scores and getting instant results.",
    icon: CheckCircle,
  },
]

export default function Features() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Key Features</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Our platform offers a range of features designed to help you navigate the university admission process with confidence.
          From accurate predictions to community support, we&apos;ve got you covered.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.name} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8" />
              <h3 className="font-bold">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
