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
  console.log('Starting program check with grade data:', gradeData)
  const results: ProgramResult[] = []

  // Get student's elective subjects
  const studentElectives = gradeData.elective_subjects.map(s => s.subject)
  console.log('Student electives:', studentElectives)

  for (const program of programRequirements) {
    try {
      console.log('\nChecking program:', program.program)
      console.log('Program campus:', program.campus)
      
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
      console.log('Program elective requirements:', electiveRequirements)
      
      if (!electiveRequirements) {
        console.log('No elective requirements specified')
        continue
      }

      // Check main requirements if they exist
      const mainRequirements = electiveRequirements.main
      if (mainRequirements) {
        console.log('Checking main requirements:', mainRequirements)
        const mainSubjects = Array.isArray(mainRequirements) ? mainRequirements : [mainRequirements]
        const hasMainSubjects = mainSubjects.every((req: string | string[]) => {
          if (Array.isArray(req)) {
            const match = req.some(subject => studentElectives.includes(subject))
            console.log(`Checking alternative subjects ${req.join(', ')}: ${match ? 'Match found' : 'No match'}`)
            return match
          }
          const match = studentElectives.includes(req)
          console.log(`Checking main subject ${req}: ${match ? 'Match found' : 'No match'}`)
          return match
        })
        
        if (!hasMainSubjects) {
          console.log('Does not meet main subject requirements')
          continue
        }
        console.log('All main subject requirements met')
      }

      // Check track requirements
      const tracks = electiveRequirements.tracks
      if (!tracks) {
        console.log('No track requirements specified')
        continue
      }

      console.log('Checking track requirements:', tracks)
      // Check if student's electives match any complete track
      let hasMatchingTrack = false
      for (const [trackName, track] of Object.entries(tracks)) {
        console.log(`\nChecking track: ${trackName}`)
        if (Array.isArray(track)) {
          const trackSubjects = track.flatMap((subjectGroup: any) => {
            if (Array.isArray(subjectGroup)) {
              return subjectGroup
            }
            return [subjectGroup]
          })
          
          console.log('Required subjects for this track:', trackSubjects)
          // Check if student has all required subjects in this track
          const hasAllTrackSubjects = trackSubjects.every((subject: string) => {
            const hasSubject = studentElectives.includes(subject)
            console.log(`Checking subject ${subject}: ${hasSubject ? 'Found' : 'Not found'}`)
            return hasSubject
          })
          
          if (hasAllTrackSubjects) {
            console.log('All subjects in this track are matched')
            hasMatchingTrack = true
            break
          } else {
            console.log('Some subjects in this track are missing')
          }
        }
      }

      if (!hasMatchingTrack) {
        console.log('Does not meet track requirements')
        continue
      }

      // If we get here, the student meets the elective requirements
      console.log('Qualified for Main Campus program')
      results.push({
        program: program.program,
        college: program.college || "Unknown College",
        campus: program.campus,
        qualified: true,
        specialRequirements: program["special requirements / general information"]
      })

    } catch (error) {
      console.error(`Error processing program ${program.program}:`, error)
      continue
    }
  }

  console.log('\nFinal qualifying programs:', results)
  return results
}