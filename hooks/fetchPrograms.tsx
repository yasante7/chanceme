import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ProgramResult } from '../utils/program-checker'
import { calculateQualifyingPrograms } from "../utils/program-checker";
export function useQualifiedPrograms () {
  const [loading, setLoading] = useState(true);
  const [allPrograms, setAllPrograms] = useState<ProgramResult[]>([]);

  useEffect(() => {
    async function getUserGrades() {
      setLoading(true);
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error.message);
          return;
        }

        if (user) {
          const { grades } = user.user_metadata || {};
          console.log("User metadata:", user.user_metadata);
          let { qualifyingPrograms } = user.user_metadata || {};

          // Check if qualifying programs exist in user metadata
          if (!user.user_metadata || !user.user_metadata.qualifyingPrograms) {
            qualifyingPrograms = calculateQualifyingPrograms(grades)
            
            // Save to Supabase or another backend
            const { error: updateError } = await supabase.auth.updateUser({
              data: { qualifyingPrograms: JSON.stringify(qualifyingPrograms) }
            });    
            if (updateError) throw updateError
          
            console.log("Calculated qualifying programs:", allPrograms);
          }

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
            setAllPrograms(qualifyingPrograms);
          } else {
            setAllPrograms([]);
          }
          setLoading(false);
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