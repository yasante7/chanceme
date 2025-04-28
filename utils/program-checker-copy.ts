import programRequirements from '@/src/data/programdatan.json'
import { GradeData } from '@/types/user'
import { isFlatStringArray, handleNestedMains, handleNoMain, handleRegularMain} from './main-functions';
import { handleTracks } from './handletrack';
import { validGradesCheck } from './validgrades';

// Clear console on window load
window.onload = () => {
  console.clear();
};

interface ProgramResult {
  program: string;
  college: string;
  campus: string;
  qualified: boolean;
  specialRequirements: string | null;
  validCombinations: string[][];
  qualifiedSubjects: string[][]; 
}

export function calculateQualifyingPrograms(gradeData: GradeData): ProgramResult[] {
  const programResults: ProgramResult[] = [];

  // Check if student grades are valid
  const electiveSubjects: string[] = gradeData.elective_subjects.map(s => s.subject);
  const electiveGrades: string[] = gradeData.elective_subjects.map(g => g.grade);
  const coreSubjects: string[] = gradeData.core_subjects.map(s => s.subject);  
  const coreGrades: string[] = gradeData.core_subjects.map(g => g.grade);

  const validGrades = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6'];
  const socialStudiesRequired = ["BA. Political Studies", "BA. History"];

  // Call the validGradesCheck function to check if all grades are valid
  const coreResults = validGradesCheck(coreGrades, coreSubjects);
  const electiveResults = validGradesCheck(electiveGrades, electiveSubjects);
  
  // Declare results for core and elective subjects
  const invalidSubjectsSet = new Set(Object.keys(electiveResults.invalidSubjects));
  const studentElectives = electiveSubjects.filter(subject => !invalidSubjectsSet.has(subject));
  
  const failedCoreSubjects = Object.keys(coreResults.invalidSubjects)

    for (const program of programRequirements) {
      let programQualified = coreResults.qualifies;

      if (failedCoreSubjects.length === 1 && failedCoreSubjects.includes("Social Studies")) {
        if (socialStudiesRequired.includes(program.program)) {
          console.log("Student does not qualify for program:", program.program);
          programQualified = false;
        }
      }
      if (programQualified) {
        console.log("Checking program:", program.program);
        console.log("Student electives:", studentElectives);
        const { main, tracks } = program['elective subjects'];
        if (!tracks) continue; // Skip if no tracks

        if (main === null) {
          const { qualifiesMain, remainSubjects, matches } = handleNoMain(studentElectives);
      
          // Confirm tracks is object (not array)
          if (tracks && typeof tracks === 'object' && !Array.isArray(tracks)) {
            const fixedTracks = tracks as Tracks;  // Cast directly
            console.log("Fixed tracks:", fixedTracks);
      
            const { matchedSubjects, allQualifiedSubjects, allValidCombinations } = handleTracks(remainSubjects, fixedTracks, matches);
      

            // After the loop, if any track qualified, push one result
            if (allQualifiedSubjects.length > 0) {
              programResults.push({
                program: program.program,
                college: program.college,
                campus: program.campus,
                qualified: true,
                specialRequirements: program["special requirements / general information"] || null,
                validCombinations: allValidCombinations,
                qualifiedSubjects: allQualifiedSubjects,
              });
            }
            console.log(JSON.stringify(programResults, null, 2));
          }
        // Handle case where main is a flat array of strings
        } else if (main !== null && isFlatStringArray(main)) {
        const { qualifiesMain, remainSubjects } = handleRegularMain(studentElectives, main as string [], []);
        if (!qualifiesMain) continue; // Skip if not qualified

        // Handle case where main is a nested array of strings
        } else if (main !== null && !isFlatStringArray(main)) {
          const { qualifiesMain, remainSubjects } = handleNestedMains(studentElectives, main as string [][], []);
          if (!qualifiesMain) continue; // Skip if not qualified
        }
      }
  }
  return programResults;
}

type Tracks = Record<string, (string | string[])[] | undefined>;