  // Load saved data when component mounts
  import { GradeData, UserData } from "@/types/user"

  /**
   * Retrieves user data from localStorage
   */
  export function retrieveUserData(): UserData | null {
    try {
      const savedData = localStorage.getItem('userData')
      if (savedData) {
        return JSON.parse(savedData)
      }
    } catch (error) {
      console.error('Error retrieving user data:', error)
    }
    return null
  }
  
  /**
   * Extracts grade data from user data
   */
  export function extractGradeData(userData: UserData): GradeData | null {
    return userData?.grades || null
  }
  
  /**
   * Creates a grades record from core and elective subjects
   */
  export function createGradesRecord(userData: UserData): Record<string, string> {
    if (!userData?.grades) return {}
    
    const { core_subjects, elective_subjects } = userData.grades
    const gradesRecord: Record<string, string> = {}
    
    // Add core subject grades
    core_subjects.forEach(({ subject, grade }) => {
      if (grade) gradesRecord[subject] = grade
    })
    
    // Add elective subject grades
    elective_subjects.forEach(({ subject, grade }) => {
      if (grade) gradesRecord[subject] = grade
    })
    
    return gradesRecord
  }
  
  /**
   * Extracts elective subjects array from user data
   */
  export function extractElectives(userData: UserData): string[] {
    if (!userData?.grades?.elective_subjects) return ['', '', '', '']
    
    return userData.grades.elective_subjects.map(({ subject }) => subject)
  }