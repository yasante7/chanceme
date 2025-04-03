import programRequirements from '@/data/programdata.json'
import { GradeData, Grade } from '@/types/user'
console.log(programRequirements)

// Points for each grade
const GRADE_POINTS: Record<Grade, number> = {
  'A1': 1,
  'B2': 2,
  'B3': 3,
  'C4': 4,
  'C5': 5,
  'C6': 6,
  'D7': 7,
  'E8': 8,
  'F9': 9
}

export function calculateQualifyingPrograms(gradeData: GradeData) {
  const results = []

  // Convert student's grades to a map for easier lookup
  const studentGrades = {
    ...Object.fromEntries(gradeData.core_subjects.map(s => [s.subject, s.grade])),
    ...Object.fromEntries(gradeData.elective_subjects.map(s => [s.subject, s.grade]))
  }

  // Calculate student's aggregate (best 6 subjects)
  const allGrades = [...gradeData.core_subjects, ...gradeData.elective_subjects]
  const bestSixTotal = allGrades
    .map(subject => GRADE_POINTS[subject.grade])
    .sort((a, b) => a - b) // Sort ascending (better grades have lower points)
    .slice(0, 6) // Take best 6
    .reduce((sum, points) => sum + points, 0)

  // Get student's elective subjects
  const studentElectives = gradeData.elective_subjects.map(s => s.subject)

  for (const program of programRequirements) {
    try {
      // Check cutoff point
      const cutoffPoint = parseInt(program["cutoff point"].toString())
      if (bestSixTotal > cutoffPoint) {
        continue // Skip if student doesn't meet cutoff
      }

      // Check core subjects
      const requiredCore = program["core subjects"]?.split(", ") ?? []
      const hasRequiredCore = requiredCore.every(subject => {
        const studentGrade = studentGrades[subject]
        return studentGrade && GRADE_POINTS[studentGrade] <= 6 // Grade C6 or better
      })

      if (!hasRequiredCore) continue

      // Parse and check elective requirements
      const electiveText = program["elective subjects"] ?? ""
      let qualifiesElectives = false

      // Handle different elective requirement formats
      if (electiveText.includes("THREE")) {
        // Case: THREE subjects from list
        const electiveOptions = electiveText
          .replace(/THREE subjects from:?\s*/i, '')
          .split(/[,\n]/)
          .map(s => s.trim())
          .filter(Boolean)

        // Check if student has any 3 subjects from the options
        const validElectives = studentElectives.filter(subject => 
          electiveOptions.some(option => subject.includes(option))
        )
        qualifiesElectives = validElectives.length >= 3
      } else {
        // Case: Specific subject requirements
        const requirements = electiveText.split(", and ")
        qualifiesElectives = requirements.every(req => {
          if (req.includes(" or ")) {
            // Handle OR conditions
            const options = req.split(" or ").map(s => s.trim())
            return options.some(opt => 
              studentElectives.some(subject => subject.includes(opt))
            )
          }
          return studentElectives.some(subject => subject.includes(req.trim()))
        })
      }

      if (!qualifiesElectives) continue

      // If all checks pass, add to qualifying programs
      results.push({
        program: program.program,
        college: program.college,
        cutoffPoint: cutoffPoint,
        userPoints: bestSixTotal,
        qualified: true,
        specialRequirements: program["special requirements / general information"]
      })

    } catch (error) {
      console.error(`Error processing program ${program.program}:`, error)
      continue
    }
  }

  // Sort results by cutoff point
  return results.sort((a, b) => a.cutoffPoint - b.cutoffPoint)
}