"use client";

import { useEffect, useState } from "react";

// Assume you import your functions here
// import { handleRegularMain, handleTracks } from "@/utils/matchingFunctions";
import programsData from "@/data/programs.json"; // Adjust path if needed

type StudentData = {
  subjects: string[]; // e.g., ["English", "Math", "Biology", "Physics"]
  grades: { [subject: string]: string }; // e.g., { "English": "A1", "Math": "B2" }
};

type Program = {
  name: string;
  main: string[] | string[][];
  tracks: {
    [trackName: string]: (string | string[])[];
  };
  // You can add more fields as needed
};

export default function MatchProgramsPage() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("userData");
    if (saved) {
      setStudentData(JSON.parse(saved));
    }
  }, []);

  function handleMatchPrograms() {
    if (!studentData) return;

    const matchedPrograms = [];

    for (const program of programsData as Program[]) {
      const matches: string[] = [];

      // Step 1: Check Main subjects
      const mainRequirement = program.main;
      const mainResult = Array.isArray(mainRequirement[0])
        ? handleNestedMain(studentData.subjects, mainRequirement as string[][])
        : handleRegularMain(studentData.subjects, mainRequirement as string[], matches);

      if (!mainResult.qualifiesMain) continue;

      // Step 2: Check Tracks (Electives)
      const trackResult = handleTracks(mainResult.remainSubjects || studentData.subjects, program.tracks, matches);

      if (trackResult.qualifiesMain) {
        matchedPrograms.push({
          program: program.name,
          matchedSubjects: matches,
        });
      }
    }

    setResults(matchedPrograms);
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Matching Programs</h1>

      {studentData ? (
        <>
          <div className="mb-6 w-full max-w-lg bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Student Subjects:</h2>
            <p>{studentData.subjects.join(", ")}</p>
          </div>

          <button
            onClick={handleMatchPrograms}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mb-6"
          >
            Match Programs
          </button>

          <div className="w-full max-w-lg">
            {results.length > 0 ? (
              results.map((result, index) => (
                <div key={index} className="mb-4 bg-green-100 p-4 rounded shadow">
                  <h3 className="text-xl font-semibold">{result.program}</h3>
                  <p>Matched Subjects: {result.matchedSubjects.join(", ")}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No matching programs yet. Click "Match Programs".</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-red-500">No student data found. Please fill the grades page first.</p>
      )}
    </div>
  );
}