type Gender = 'male' | 'female'
type Region = 'Greater Accra' | 'Ashanti' | 'Western' | 'Eastern' | 'Central' | 'Northern' | 'Upper East' | 'Upper West' | 'Volta' | 'Bono' | 'Bono East' | 'Ahafo' | 'Savannah' | 'North East' | 'Oti' | 'Western North'

// Define the regions as a constant array
export const REGIONS: Region[] = [
    'Greater Accra', 'Ashanti', 'Western', 'Eastern', 'Central',
    'Northern', 'Upper East', 'Upper West', 'Volta', 'Bono',
    'Bono East', 'Ahafo', 'Savannah', 'North East', 'Oti', 'Western North'
]

export type {Gender, Region}

  export function validateEmail (email: string) {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address"
    }
    return ""
  }