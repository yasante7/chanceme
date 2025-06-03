import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type GradeData = {
  core_subjects: Array<{ grade: string; subject: string }>,
  elective_subjects: Array<{ grade: string; subject: string }>,
  program: string,
  region: string,
  school: string
}
export function useUserGrades () {
  const [grades, setGrades] = useState<GradeData | "Loading..." | "No grades available">("Loading...");
  const [allGradeEntries, setAllGradeEntries] = useState<Array<{ grade: string; subject: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserGrades() {
      setLoading(true);
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error.message);
          setLoading(false);
          return;
        }

        if (user) {
          const { grades } = user.user_metadata || {};
          if (
            grades &&
            Array.isArray(grades.core_subjects) &&
            Array.isArray(grades.elective_subjects) &&
            (grades.core_subjects.length > 0 || grades.elective_subjects.length > 0)
          ) {
            console.log("Fetched grades:", grades)
            setAllGradeEntries([...grades.core_subjects, ...grades.elective_subjects]);
            setGrades(grades);
          } else {
            setAllGradeEntries([]);
            setGrades("No grades available");
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    }

    getUserGrades();
  }, []);

  return { allGradeEntries, grades, loading };
}
