import programRequirements from '@/src/data/programdatan.json'
import { GradeData } from '@/types/user'
import { isFlatStringArray, handleNestedMains, handleNoMain, handleRegularMain} from './main-helper-functions';
import { handleTracks, generateThreeSubjectCombinations } from './track-and-combinations';

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

export interface StoredCombination {
  program: string;
  college: string;
  campus: string;
  combinations: string[][];
  coreSubjects: string[];
}

export function calculateQualifyingPrograms(gradeData: GradeData): ProgramResult[] {
  const studentElectives: string[] = gradeData.elective_subjects.map(s => s.subject);
  const programResults: ProgramResult[] = [];

  for (const program of programRequirements) {
    console.log("Checking program:", program.program);
    console.log("Student electives:", studentElectives);
    const { main, tracks } = program['elective subjects'];

    // Handle case where no main subject is required
    if (main === null) {
      const { qualifiesMain, remainSubjects, matches } = handleNoMain(studentElectives);

      // Work on tracks and generate combinations
      const { matchedSubjects, allQualifiedSubjects, allValidCombinations } = handleTracks(remainSubjects, tracks, matches);


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
    console.log(programResults, null, 2);




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

  return programResults;
}