import { GradeData } from '@/types/user'
import { isFlatStringArray, handleNestedMains, handleNoMain, handleRegularMain } from './main-functions';
import { handleTracks } from './handletrack';
import { validGradesCheck } from './validgrades';
import { calculateAggregate } from './calculatecutoffpoint';

// Import all schools data
import knustRequirements from '@/src/data/colleges/knustdata.json'

// Clear console on window load
if (typeof window !== 'undefined') {
  window.onload = () => console.clear();
}

export interface ProgramResult {
  program: string;
  college: string;
  cutoffPoint: number;
  Aggregate: number;
  campus: string;
  specialRequirements: string | null;
  validCombinations: string[][];
  schoolName: string;
}

type Tracks = Record<string, (string | string[])[] | undefined>;

export function calculateQualifyingPrograms(gradeData: GradeData): ProgramResult[] {
  const programResults: ProgramResult[] = [];
  const allSchoolsData = [knustRequirements];

  for (const schoolData of allSchoolsData){
    const schoolDetails = schoolData[0]
    const schoolName = 'schoolname' in schoolDetails ? schoolDetails.schoolname : '';
    const allPrograms = Array.isArray(schoolData[1]) 
      ? schoolData[1] 
      : [];

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
    }
    
    for (const program of allPrograms) {
      console.log(`\nEVALUATING PROGRAM: ${program.program}`);
    
      const programQualified = onlyFailedSocialStudies
        ? !socialStudiesRequired.includes(program.program)
        : coreResults.qualifies;
    
      if (!programQualified) {
        continue;
      }

      // Extract program requirements
      const { main, tracks } = program['elective subjects'];
      
      // Skip programs without track requirements
      if (!tracks) {
        continue;
      }

      // Process based on main subject requirement type
      let qualifiesMain = false;
      let remainSubjects: string[] = [];
      let matches: string[] | string[][] = [];

      // Case 1: No main subjects required
      if (main === null) {
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
          continue;
        }
      } 
      // Case 3: Nested main subjects (array of arrays)
      else {
        const result = handleNestedMains(studentElectives, main as string[][]);
        qualifiesMain = result.qualifiesMain;
        remainSubjects = result.remainSubjects;
        matches = result.matched || [];
        
        if (!qualifiesMain) {
          continue;
        }
      }

      // Process track requirements
      if (tracks && typeof tracks === 'object' && !Array.isArray(tracks)) {
        
        // Handle potential nested tracks structure
        let tracksToProcess = tracks;
        if ('tracks' in tracks && tracks.tracks) {
          tracksToProcess = tracks.tracks as Record<string, (string | string[])[] | undefined>;
        }

        const { allValidCombinations } = handleTracks(remainSubjects, tracksToProcess as Tracks, matches);

        const results = calculateAggregate(program.program, schoolName, program.campus, program.college, 
          program["cutoff point"] ?? 0, program['special requirements / general information'], allValidCombinations, gradeData);

        programResults.push(...results);
      }
    }
  }

  console.log(`\nQualification check complete. Student qualifies for ${programResults.length} programs.`);
  return programResults;
}

