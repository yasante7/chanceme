"use client";
import DashboardHeader from "./components/dashboard-header";
import ProgramRecommendations from "./recommendations/page";
import UserProfile from "./profile/page";
import NextSteps from "./components/next-steps";
import { useUserGrades } from "@/hooks/fetchGrades";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { loading, grades } = useUserGrades();
  const router = useRouter();

  const isValidGrades =
    typeof grades === "object" &&
    grades !== null &&
    (grades.core_subjects?.length > 0 || grades.elective_subjects?.length > 0);

  if (loading) return null;

  if (!isValidGrades) {
    router.push("/dashboard/onboarding");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Program Recommendations</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <ProgramRecommendations />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 order-1 lg:order-2">
            <div className="sticky top-24 space-y-6">
              <UserProfile />
              <NextSteps />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
