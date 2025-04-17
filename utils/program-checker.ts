import programRequirements from '@/data/programdatan.json'
import { GradeData } from '@/types/user'
console.log(programRequirements)

interface ProgramResult {
  program: string;
  college: string;
  campus: string;
  qualified: boolean;
  specialRequirements: string | null;
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
          specialRequirements: program["special requirements / general information"]
        })
        continue
      }

      // For Kumasi campus programs, check electives
      const electiveRequirements = program["elective subjects"]
      console.log('\nProgram Requirements:', JSON.stringify(electiveRequirements, null, 2))
      
      if (!electiveRequirements) {
        console.log('❌ No elective requirements specified')
        continue
      }

      // Check main requirements if they exist
      const mainRequirements = electiveRequirements.main
      if (mainRequirements) {
        console.log('\nChecking Main Requirements:', mainRequirements)
        const mainSubjects = Array.isArray(mainRequirements) ? mainRequirements : [mainRequirements]
        const hasMainSubjects = mainSubjects.every((req: string | string[]) => {
          if (Array.isArray(req)) {
            // If it's an array, only one subject needs to match
            const match = req.some(subject => studentElectives.includes(subject))
            console.log(`Checking alternative subjects ${req.join(', ')}: ${match ? '✅ Match found' : '❌ No match'}`)
            return match
          }
          const match = studentElectives.includes(req)
          console.log(`Checking main subject ${req}: ${match ? '✅ Match found' : '❌ No match'}`)
          return match
        })
        
        if (!hasMainSubjects) {
          console.log('❌ Does not meet main subject requirements')
          continue
        }
        console.log('✅ All main subject requirements met')
      }

      // Check track requirements
      const tracks = electiveRequirements.tracks
      if (!tracks) {
        console.log('❌ No track requirements specified')
        continue
      }

      console.log('\nChecking Track Requirements:', JSON.stringify(tracks, null, 2))
      // Check if student's electives match any complete track
      let hasMatchingTrack = false
      
      for (const [trackName, trackGroups] of Object.entries(tracks)) {
        console.log(`\nChecking Track: ${trackName}`)
        
        // Each track group represents an alternative set of requirements
        // The student must meet ALL requirements in at least ONE group
        const hasMatchingGroup = trackGroups.some((group: any) => {
          // For each group, check if student has the required subjects
          const groupSubjects = Array.isArray(group) ? group : [group]
          console.log(`Checking Group: ${groupSubjects.join(', ')}`)
          
          // If the group is an array, only one subject needs to match
          if (Array.isArray(group)) {
            const hasAnySubject = group.some((subject: string) => {
              const hasSubject = studentElectives.includes(subject)
              console.log(`Checking subject ${subject}: ${hasSubject ? '✅ Found' : '❌ Not found'}`)
              return hasSubject
            })
            
            if (hasAnySubject) {
              console.log('✅ Found at least one matching subject in this group')
              return true
            }
            console.log('❌ No subjects in this group match')
            return false
          }
          
          // If it's a single subject, it must match
          const hasSubject = studentElectives.includes(group)
          console.log(`Checking single subject ${group}: ${hasSubject ? '✅ Found' : '❌ Not found'}`)
          return hasSubject
        })
        
        if (hasMatchingGroup) {
          console.log('✅ Found matching group in track')
          hasMatchingTrack = true
          break
        }
      }

      if (!hasMatchingTrack) {
        console.log('❌ Does not meet track requirements')
        continue
      }

      // If we get here, the student meets the elective requirements
      console.log('✅ Qualified for program')
      results.push({
        program: program.program,
        college: program.college || "Unknown College",
        campus: program.campus,
        qualified: true,
        specialRequirements: program["special requirements / general information"]
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