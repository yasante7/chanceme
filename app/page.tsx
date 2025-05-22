import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, GraduationCap, School, TrendingUp, Users, MessageSquare } from "lucide-react"
import { NavBar } from "@/components/nav-bar"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Predict Your University Admission Chances
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Use our advanced algorithm to calculate your likelihood of admission to Ghanaian universities based on
                  your exam scores and school history.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button>Get Started</Button>
                </Link>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <TrendingUp className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Accurate Predictions</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our algorithm uses historical data to provide precise admission probability estimates.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <School className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">School-Specific Insights</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get tailored predictions based on your specific high school&apos;s track record.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Users className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Enrolled Student Reporting</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Current university students can report their status to improve prediction accuracy.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <MessageSquare className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Community Forum</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Engage with other students, share experiences, and get advice on the admission process.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <CheckCircle className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Easy to Use</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Simple interface for inputting your scores and getting instant results.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid gap-10 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <GraduationCap className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Enter Your Scores</h3>
                <p className="text-gray-500 dark:text-gray-400">Input your exam scores and select your high school.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <School className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Choose Universities</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Select the Ghanaian universities you&apos;re interested in.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <TrendingUp className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Get Your Prediction</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive detailed admission probability estimates for each university.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="enrolled-students" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray">Already Enrolled?</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Help future students by reporting your admission status. Your input improves our prediction accuracy!
              </p>
              <Button>Report Your Status</Button>
            </div>
          </div>
        </section>
        <section id="forum" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Community</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Connect with other students, share your experiences, and get valuable advice on the university admission
                process.
              </p>
              <Button variant="outline">Visit the Forum</Button>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray">
                  Ready to Calculate Your Chances?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Start your journey to higher education with confidence. Use ChanceMe today!
                </p>
              </div>
              <Button className="bg-background text-primary hover:bg-background/90">
                <Link href="/register" className="flex items-center">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 ChanceMe. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}