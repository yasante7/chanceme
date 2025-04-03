export type Gender = 'male' | 'female'
export type Region = 'Greater Accra' | 'Ashanti' | 'Western' | 'Eastern' | 'Central' | 'Northern' | 'Upper East' | 'Upper West' | 'Volta' | 'Bono' | 'Bono East' | 'Ahafo' | 'Savannah' | 'North East' | 'Oti' | 'Western North'
export type Grade = 'A1' | 'B2' | 'B3' | 'C4' | 'C5' | 'C6' | 'D7' | 'E8' | 'F9'

export interface UserRegistration {
  name: string
  email: string
  password: string
  dateOfBirth: string
  gender: Gender
  phone: string
  region: Region
}

export interface GradeData {
  program: string
  core_subjects: {
    subject: string
    grade: Grade
  }[]
  elective_subjects: {
    subject: string
    grade: Grade
  }[]
}

export interface UserData extends UserRegistration {
  grades?: GradeData
}