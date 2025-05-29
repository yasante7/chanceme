import { CheckCircle, GraduationCap, School, TrendingUp, Users, MessageSquare } from "lucide-react"

export function KeyFeaturesHow() {
    return (
        <div>
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
        </div>
    )
}