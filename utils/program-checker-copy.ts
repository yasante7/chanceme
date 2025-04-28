import programRequirements from '@/src/data/programdatan.json'
import { GradeData } from '@/types/user'
import { isFlatStringArray, handleNestedMains, handleNoMain, handleRegularMain } from './main-functions';
import { handleTracks } from './handletrack';
import { validGradesCheck } from './validgrades';

// Clear console on window load
if (typeof window !== 'undefined') {
  window.onload = () => console.clear();
}

interface ProgramResult {
  program: string;
  college: string;
  campus: string;
  qualified: boolean;
  specialRequirements: string | null;
  validCombinations: string[][];
  qualifiedSubjects: string[][];
}

type Tracks = Record<string, (string | string[])[] | undefined>;

export function calculateQualifyingPrograms(gradeData: GradeData): ProgramResult[] {
  const programResults: ProgramResult[] = [];
  console.log("Starting program qualification check...");

  // Extract subjects and grades from student data
  const electiveSubjects = gradeData.elective_subjects.map(s => s.subject);
  const electiveGrades = gradeData.elective_subjects.map(g => g.grade);
  const coreSubjects = gradeData.core_subjects.map(s => s.subject);
  const coreGrades = gradeData.core_subjects.map(g => g.grade);

  // Programs that specifically require Social Studies
  const socialStudiesRequired = ["BA. Political Studies", "BA. History"];

  // Validate grades
  const coreResults = validGradesCheck(coreGrades, coreSubjects);
  const electiveResults = validGradesCheck(electiveGrades, electiveSubjects);
  
  const invalidSubjectsSet = new Set(Object.keys(electiveResults.invalidSubjects));
  const studentElectives = electiveSubjects.filter(subject => !invalidSubjectsSet.has(subject));
  const failedCoreSubjects = Object.keys(coreResults.invalidSubjects);
  
  console.log(`Student has ${studentElectives.length} valid electives:`, studentElectives);
  
  const onlyFailedSocialStudies = (failedCoreSubjects.length === 1 && failedCoreSubjects.includes("Social Studies"));
  
  if (onlyFailedSocialStudies) {
    console.log("⚡ Only failed Social Studies. Adjusting core qualification conditionally...");
  }
  
  for (const program of programRequirements) {
    console.log(`\nEVALUATING PROGRAM: ${program.program}`);
  
    let programQualified = onlyFailedSocialStudies
      ? !socialStudiesRequired.includes(program.program)
      : coreResults.qualifies;
  
    if (!programQualified) {
      console.log(`Skipping ${program.program} - student doesn't qualify for core requirements`);
      continue;
    }

    // Extract program requirements
    const { main, tracks } = program['elective subjects'];
    
    // Skip programs without track requirements
    if (!tracks) {
      console.log(`Skipping ${program.program} - no tracks defined`);
      continue;
    }

    // Process based on main subject requirement type
    let qualifiesMain = false;
    let remainSubjects: string[] = [];
    let matches: string[] = [];

    // Case 1: No main subjects required
    if (main === null) {
      console.log(`${program.program} has no main subject requirements`);
      const result = handleNoMain(studentElectives);
      qualifiesMain = result.qualifiesMain;
      remainSubjects = result.remainSubjects;
      matches = result.matches || [];
    } 
    // Case 2: Regular main subjects (flat array)
    else if (isFlatStringArray(main)) {
      const result = handleRegularMain(studentElectives, main as string[]);
      qualifiesMain = result.qualifiesMain;
      remainSubjects = result.remainSubjects;
      matches = result.matched || [];
      
      if (!qualifiesMain) {
        console.log(`Student doesn't meet main subject requirements for ${program.program}`);
        continue;
      }
    } 
    // Case 3: Nested main subjects (array of arrays)
    else {
      console.log(`${program.program} has nested main subjects`);
      const result = handleNestedMains(studentElectives, main as string[][]);
      qualifiesMain = result.qualifiesMain;
      remainSubjects = result.remainSubjects;
      matches = result.matched || [];
      
      if (!qualifiesMain) {
        console.log(`Student doesn't meet nested main subject requirements for ${program.program}`);
        continue;
      }
    }

    // Process track requirements
    if (tracks && typeof tracks === 'object' && !Array.isArray(tracks)) {
      
      // Handle potential nested tracks structure
      let tracksToProcess = tracks;
      if ('tracks' in tracks && tracks.tracks) {
        tracksToProcess = tracks.tracks as any;
      }
      console.log("Matched main subjects:", matches);
      console.log("Remaining subjects after main match:", remainSubjects);

      const { matchedSubjects, allQualifiedSubjects, allValidCombinations } = 
        handleTracks(remainSubjects, tracksToProcess as Tracks, matches);
      
      // If student qualifies for this program, add to results
      if (allQualifiedSubjects.length > 0) {
        console.log(`✅ Student QUALIFIES for ${program.program}`);
        programResults.push({
          program: program.program,
          college: program.college,
          campus: program.campus,
          qualified: true,
          specialRequirements: program["special requirements / general information"] || null,
          validCombinations: allValidCombinations,
          qualifiedSubjects: allQualifiedSubjects,
        });
      } else {
        console.log(`❌ Student does NOT qualify for ${program.program} - insufficient track matches`);
      }
    }
  }

  console.log(`\nQualification check complete. Student qualifies for ${programResults.length} programs.`);
  return programResults;
}