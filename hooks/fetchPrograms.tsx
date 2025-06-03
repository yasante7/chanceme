import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ProgramResult } from '../utils/program-checker'

export function useQualifiedPrograms () {
  const [loading, setLoading] = useState(true);
  const [allPrograms, setALlPrograms] = useState<ProgramResult[]>([]);

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
          let { qualifyingPrograms } = user.user_metadata || {};
          console.log("Raw qualifyingPrograms from metadata:", qualifyingPrograms);
          if (typeof qualifyingPrograms === "string") {
            try {
              qualifyingPrograms = JSON.parse(qualifyingPrograms);
            } catch (error) {
              console.error("Error parsing qualifyingPrograms:", error);
              qualifyingPrograms = [];
            }
          }
          if (Array.isArray(qualifyingPrograms)) {
            setALlPrograms(qualifyingPrograms);
          } else {
            setALlPrograms([]);
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

  return { allPrograms, loading };
}