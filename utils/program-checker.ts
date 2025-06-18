import { GradeData } from '@/types/user'
import { isFlatStringArray, handleNestedMains, handleNoMain, handleRegularMain } from './main-functions';
import { handleTracks } from './handletrack';
import { validGradesCheck } from './validgrades';
import { calculateAggregate } from './calculatecutoffpoint';

// Import all schools data
import knustRequirements from '@/src/data/colleges/knust/knustdata.json'
import ugRequirements from '@/src/data/colleges/ug/updated_ug.json'

// Clear console on window load
// if (typeof window !== 'undefined') {
//   window.onload = () => console.clear();
// }

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
  const allSchoolsData = [knustRequirements, ugRequirements];

  for (const schoolData of allSchoolsData){
    const schoolDetails = schoolData[0]
    const schoolName = 'schoolname' in schoolDetails ? schoolDetails.schoolname : '';
    // Extract subjects and grades from student data
    const electiveSubjects = gradeData.elective_subjects.map(s => s.subject);
    const electiveGrades = gradeData.elective_subjects.map(g => g.grade);

    // Validate grades
    const coreSubjects = gradeData.core_subjects.map(s => s.subject);
    const coreGrades = gradeData.core_subjects.map(g => g.grade);
    const coreResults = validGradesCheck(coreGrades, coreSubjects);
    const failedCoreSubjects = Object.keys(coreResults.invalidSubjects);

    const electiveResults = validGradesCheck(electiveGrades, electiveSubjects);
    
    const invalidSubjectsSet = new Set(Object.keys(electiveResults.invalidSubjects));
    const studentElectives = electiveSubjects.filter(subject => !invalidSubjectsSet.has(subject));
    
    console.log(`Student has ${studentElectives.length} valid electives:`, studentElectives);
    
    const allPrograms = Array.isArray(schoolData[1]) 
      ? schoolData[1] 
      : [];
    for (const program of allPrograms) {
      console.log(`\nEVALUATING PROGRAM: ${program.program}`);

      const filteringSubjects = program.filteringsubject ? program.filteringsubject : [];

      const failedOneFiltering = filteringSubjects.some(subject => failedCoreSubjects.includes(subject));

      if (failedOneFiltering || failedCoreSubjects.length > 1) {
          console.log(`Skipping ${program.program} due to failed core subject(s): ${failedCoreSubjects}`);
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

        for (const [trackName, value] of Object.entries(tracksToProcess)) {
          if (!Array.isArray(value)) {
            console.warn(`🚨 Program "${program.program}" has invalid track entry for "${trackName}":`, value);
          }
        }

        const { allValidCombinations } = handleTracks(remainSubjects, tracksToProcess as Tracks, matches);

        const results = calculateAggregate(schoolName, program, allValidCombinations, gradeData);

        programResults.push(...results);
      }
    }
  }

  console.log(`\nQualification check complete. Student qualifies for ${programResults.length} programs.`);
  return programResults;
}