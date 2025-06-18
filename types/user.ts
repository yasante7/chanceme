export type Gender = 'male' | 'female'
export type Region = 'Central' | 'Eastern' | 'Bono' | 'Upper East' | 'Upper West' | 'Greater Accra' | 'Western' | 'Northern' | 'Bono East' | 'Ahafo' | 'Ashanti' | 'Volta' | 'Western North' | 'North East' | 'Oti' | 'Savannah'
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
  school: string
  region: string
  core_subjects: {
    subject: string
    grade: string
  }[]
  elective_subjects: {
    subject: string
    grade: string
  }[]
}

export interface UserData extends UserRegistration {
  grades?: GradeData
}

export interface Program {
  program: string;
  "cutoff point": {
    firstChoiceSubjectArea: number | null;
    firstChoiceNonSubject: number | null;
    fullFeePaying: number | null;
    secondChoice: number | null;
    subjectRequirements: string | null;
  };
  college: string;
  campus: string;
  filteringsubject: string[] | string | null;
  alternatecore: string[] | string | null;
  "core subjects": string[];
  "elective subjects": ElectiveSubjects;
  "applicant type": string;
  "special requirements / general information": string | null;
}
export interface ElectiveSubjects {
  main: string[] | string[][] | null;
  tracks: TrackMap;
}

export type TrackMap = {
  [key: string]: TrackEntry | undefined;
};

export type TrackEntry = string[] | string[][] | (string | string[])[];