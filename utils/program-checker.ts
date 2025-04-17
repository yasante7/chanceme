import programRequirements from '@/data/programdatan.json'
import { GradeData } from '@/types/user'
console.log(programRequirements)

interface ProgramResult {
  program: string;
  college: string;
  campus: string;
  qualified: boolean;
  specialRequirements: string | null;
  validCombinations: string[][];
}

export interface StoredCombination {
  program: string;
  college: string;
  campus: string;
  combinations: string[][];
  coreSubjects: string[];
}

// Helper function to check if a subject matches any in a group
function matchesSubject(subject: string, group: string | string[]): boolean {
  if (typeof group === 'string') {
    return subject === group;
  }
  return group.includes(subject);
}

// Helper function to check if a subject matches any in a track
function matchesTrack(subject: string, track: any): boolean {
  if (Array.isArray(track)) {
    return track.some((item: any) => matchesSubject(subject, item));
  }
  return matchesSubject(subject, track);
}


// Helper function to check if a subject is available in student's electives
function isSubjectAvailable(subject: SubjectGroup, studentElectives: string[]): boolean {
  if (Array.isArray(subject)) {
    if (subject.length === 0) return false;
    if (typeof subject[0] === 'string') {
      return subject.some(s => typeof s === 'string' && studentElectives.includes(s));
    } else {
      return subject.some(group => isSubjectAvailable(group, studentElectives));
    }
  }
  return studentElectives.includes(subject as string);
}

// Helper function to get available subjects from a group
function getAvailableSubjectsFromGroup(group: SubjectGroup, studentElectives: string[]): string[] {
  if (Array.isArray(group)) {
    if (group.length === 0) return [];
    if (typeof group[0] === 'string') {
      return group.filter(subject => isSubjectAvailable(subject, studentElectives)) as string[];
    } else {
      return group.flatMap(subGroup => getAvailableSubjectsFromGroup(subGroup, studentElectives));
    }
  }
  return isSubjectAvailable(group, studentElectives) ? [group as string] : [];
}

// Helper function to check if main requirements are met
function checkMainRequirements(main: string | string[] | null, studentElectives: string[]): boolean {
  if (!main) return true;
  
  if (Array.isArray(main)) {
    // If main is an array, any one of them can satisfy the requirement
    return main.some(subject => {
      if (Array.isArray(subject)) {
        return subject.some(s => isSubjectAvailable(s, studentElectives));
      }
      return isSubjectAvailable(subject, studentElectives);
    });
  }
  
  return isSubjectAvailable(main, studentElectives);
}

// Helper function to get the main subject(s) to use
function getMainSubjects(main: string | string[] | null, studentElectives: string[]): string[] {
  if (!main) return [];
  
  if (Array.isArray(main)) {
    // Find the first available subject from any group
    for (const subject of main) {
      if (Array.isArray(subject)) {
        const available = subject.filter(s => isSubjectAvailable(s, studentElectives));
        if (available.length > 0) return [available[0]];
      } else if (isSubjectAvailable(subject, studentElectives)) {
        return [subject];
      }
    }
    return [];
  }
  
  return isSubjectAvailable(main, studentElectives) ? [main] : [];
}

// Helper function to check if a combination is valid (no two subjects from same group)
function isValidCombination(combination: string[], groups: SubjectGroup[]): boolean {
  for (const group of groups) {
    const groupSubjects = Array.isArray(group) ? 
      (typeof group[0] === 'string' ? group : group.flat()) : 
      [group as string];
    const subjectsFromGroup = combination.filter(subject => groupSubjects.includes(subject));
    if (subjectsFromGroup.length > 1) {
      return false;
    }
  }
  return true;
}

type SubjectGroup = string | string[] | (string | string[])[];
type Track = SubjectGroup[];
type Tracks = Record<string, Track | undefined>;

export function generateValidElectiveCombinations(
  programElectives: {
    main: string | string[] | null;
    tracks: Tracks;
  },
  studentElectives: string[]
): string[][] {
  const validCombinations: string[][] = [];
  
  // Get main subjects to use
  const mainSubjects = getMainSubjects(programElectives.main, studentElectives);
  if (mainSubjects.length === 0 && programElectives.main) {
    return []; // If main is required but not available, return empty
  }
  
  // Get all track groups and flatten them
  const allGroups = Object.values(programElectives.tracks)
    .filter((track): track is Track => track !== undefined)
    .flat();
  
  // Get all available subjects from each group
  const availableSubjectsPerGroup = allGroups.map(group => 
    getAvailableSubjectsFromGroup(group, studentElectives)
  );
  
  // Flatten all available subjects
  const allAvailableSubjects = availableSubjectsPerGroup.flat();
  
  // If we don't have enough subjects to make combinations, return empty
  if (allAvailableSubjects.length + mainSubjects.length < 3) {
    return [];
  }
  
  // Generate all possible combinations of 3 subjects
  const generateCombinations = (current: string[], start: number, remaining: number): void => {
    if (remaining === 0) {
      // Check if the combination is valid (no two subjects from same group)
      if (isValidCombination(current, allGroups)) {
        validCombinations.push([...current]);
      }
      return;
    }
    
    for (let i = start; i < allAvailableSubjects.length; i++) {
      current.push(allAvailableSubjects[i]);
      generateCombinations(current, i + 1, remaining - 1);
      current.pop();
    }
  };
  
  // Start with main subjects and find remaining subjects
  const remainingSubjectsNeeded = 3 - mainSubjects.length;
  if (remainingSubjectsNeeded > 0) {
    generateCombinations([...mainSubjects], 0, remainingSubjectsNeeded);
  } else if (mainSubjects.length === 3) {
    // If we have exactly 3 main subjects, that's a valid combination
    validCombinations.push([...mainSubjects]);
  }
  
  // Remove duplicates
  const uniqueCombinations = Array.from(
    new Set(validCombinations.map(combination => combination.sort().join(',')))
  ).map(combination => combination.split(','));
  
  return uniqueCombinations;
}

export function calculateQualifyingPrograms(gradeData: GradeData): ProgramResult[] {
  console.log('=== STARTING PROGRAM CHECK ===')
  console.log('Student Grade Data:', JSON.stringify(gradeData, null, 2))
  const results: ProgramResult[] = []

  // Get student's elective subjects
  const studentElectives = gradeData.elective_subjects.map(s => s.subject)
  console.log('Student Elective Subjects:', studentElectives)

  for (const program of programRequirements) {
    try {
      console.log('\n=== CHECKING PROGRAM ===')
      console.log('Program:', program.program)
      console.log('Campus:', program.campus)
      console.log('College:', program.college)
      
      // Check if program is in Obuasi campus
      if (program.campus === "Obuasi Campus") {
        console.log('Processing Obuasi Campus program - no subject requirements')
        results.push({
          program: program.program,
          college: program.college || "Unknown College",
          campus: program.campus,
          qualified: true,
          specialRequirements: program["special requirements / general information"],
          validCombinations: []
        })
        continue
      }

      // For Kumasi campus programs, check electives
      const electiveRequirements = program["elective subjects"]
      console.log('\nProgram Requirements:', JSON.stringify(electiveRequirements, null, 2))
      
      if (!electiveRequirements) {
        console.log('❌ No elective requirements specified')
        results.push({
          program: program.program,
          college: program.college || "Unknown College",
          campus: program.campus,
          qualified: false,
          specialRequirements: program["special requirements / general information"],
          validCombinations: []
        })
        continue
      }

      // Check main requirements
      const mainRequirements = electiveRequirements.main
      const hasMainRequirements = checkMainRequirements(mainRequirements, studentElectives)
      
      if (!hasMainRequirements) {
        console.log('❌ Does not meet main subject requirements')
        results.push({
          program: program.program,
          college: program.college || "Unknown College",
          campus: program.campus,
          qualified: false,
          specialRequirements: program["special requirements / general information"],
          validCombinations: []
        })
        continue
      }
      console.log('✅ Main subject requirements met')

      // Check track requirements
      const tracks = electiveRequirements.tracks
      if (!tracks) {
        console.log('❌ No track requirements specified')
        results.push({
          program: program.program,
          college: program.college || "Unknown College",
          campus: program.campus,
          qualified: false,
          specialRequirements: program["special requirements / general information"],
          validCombinations: []
        })
        continue
      }

      console.log('\nChecking Track Requirements:', JSON.stringify(tracks, null, 2))
      
      // Generate valid combinations for this program
      const validCombinations = generateValidElectiveCombinations(
        electiveRequirements,
        studentElectives
      )
      console.log('Valid Combinations:', validCombinations)

      // Save combinations to localStorage
      if (validCombinations.length > 0) {
        import('./storage').then(({ saveCombinationsToStorage }) => {
          saveCombinationsToStorage(program, validCombinations);
        });
      }

      // If we get here, the student meets the elective requirements
      console.log('✅ Qualified for program')
      results.push({
        program: program.program,
        college: program.college || "Unknown College",
        campus: program.campus,
        qualified: true,
        specialRequirements: program["special requirements / general information"],
        validCombinations: validCombinations
      })

    } catch (error) {
      console.error(`❌ Error processing program ${program.program}:`, error)
      continue
    }
  }

  console.log('\n=== FINAL RESULTS ===')
  console.log('Qualifying Programs:', JSON.stringify(results, null, 2))
  return results
}

// Function to get all saved combinations
export function getAllSavedCombinations(): StoredCombination[] {
  const storedData = localStorage.getItem('programCombinations');
  if (!storedData) {
    console.log('No combinations found in localStorage');
    return [];
  }

  try {
    return JSON.parse(storedData);
  } catch (error) {
    console.error('Error parsing stored combinations:', error);
    return [];
  }
}

// Function to get combinations for a specific program and campus
export function getCombinationsForProgram(program: string, campus: string): StoredCombination | null {
  const allCombinations = getAllSavedCombinations();
  return allCombinations.find(
    item => item.program === program && item.campus === campus
  ) || null;
}

// Function to display combinations in a formatted way
export function displayCombinations(combinations: StoredCombination[]): void {
  if (combinations.length === 0) {
    console.log('No combinations found');
    return;
  }

  console.log('\n=== SAVED COMBINATIONS ===');
  combinations.forEach(item => {
    console.log(`\nProgram: ${item.program}`);
    console.log(`College: ${item.college}`);
    console.log(`Campus: ${item.campus}`);
    console.log('Core Subjects:', item.coreSubjects.join(', '));
    console.log('Valid Combinations:');
    item.combinations.forEach((combination, index) => {
      console.log(`${index + 1}. ${combination.join(', ')}`);
    });
    console.log('------------------------');
  });
}

// Display all combinations
displayCombinations(getAllSavedCombinations());

// Example usage:
// To see all saved combinations:
// displayCombinations(getAllSavedCombinations());

// To see combinations for a specific program:
// const programCombinations = getCombinationsForProgram('BSc. Agriculture', 'Kumasi (Main) Campus');
// if (programCombinations) {
//   console.log(programCombinations);
// }
