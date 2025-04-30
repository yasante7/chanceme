export type Grade = 'A1' | 'B2' | 'B3' | 'C4' | 'C5' | 'C6' | 'D7' | 'E8' | 'F9'

export const PROGRAMS = [
  'General Science',
  'General Arts',
  'Business',
  'Visual Arts',
  'Home Economics',
  'Agricultural Science',
  'Technical'
] as const

export const CORE_SUBJECTS = [
  'English Language',
  'Mathematics (Core)',
  'Integrated Science',
  'Social Studies'
] as const

export let PROGRAM_SUBJECTS = {
  'General Science': [
    'Elective Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Elective ICT',
    'Geography'
  ],
  'General Arts': [
    'Economics',
    'Geography',
    'Government',
    'History',
    'Elective Mathematics',
    'Christian Religious Studies',
    'Music',
    'Elective ICT',
    'Literature in English',
    'French',
    'Fante',
    'Akuapem Twi',
    'Asante Twi',
    'Ga',
    'Ewe',
    'Arabic',
    'Dagaare',
    'Dagbani',
    'Gonja',
    'Kasem',
    'Nzema'
  ],
  'Business': [
    'Business Management',
    'Financial Accounting',
    'Economics',
    'Cost Accounting',
    'Elective Mathematics',
    'Elective ICT',
    'French',
    'Clerical Office Duties'
  ],
  'Visual Arts': [
    'ICT',
    'General Knowledge in Art',
    'Textiles',
    'Picture Making',
    'Ceramics and Sculpture',
    'Ceramics and Basketry',
    'Graphic Design',
    'Leather Work',
    'Basketry',
    'Sculpture',
    'French'
  ],
  'Home Economics': [
    'Economics',
    'Food and Nutrition',
    'Clothing and Textiles',
    'Management in Living',
    'Chemistry',
    'Biology'
  ],
  'Agricultural Science': [
    'General Agriculture',
    'Animal Husbandry',
    'Agricultural Economics',
    'Elective Mathematics',
    'Crop Science',
    'Chemistry',
    'Physics'
  ],
  'Technical': [
    'Technical Drawing',
    'Building Construction',
    'Woodwork',
    'Metalwork',
    'Auto Mechanics',
    'Electronics',
    'Applied Electricity',
    'Automobile Engineering',
    'Electrical Engineering'
  ]
} as const

export const Languages = [
  'Fante',
  'Akuapem Twi',
  'Asante Twi',
  'Ga',
  'Ewe',
  'Arabic',
  'Dagaare',
  'Dagbani',
  'Gonja',
  'Kasem',
  'Nzema'
]

export const GRADES: Grade[] = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9']