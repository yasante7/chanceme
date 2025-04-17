import { StoredCombination } from './program-checker';

// Check if we're in the browser environment
const isBrowser = typeof window !== 'undefined';

// Function to get all saved combinations
export function getAllSavedCombinations(): StoredCombination[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const data = localStorage.getItem('programCombinations');
  if (!data) return [];
  
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing saved combinations:', error);
    return [];
  }
}

// Function to get combinations for a specific program and campus
export function getCombinationsForProgram(program: string, campus: string): StoredCombination | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const allCombinations = getAllSavedCombinations();
  return allCombinations.find(
    item => item.program === program && item.campus === campus
  ) || null;
}

// Function to display combinations in a formatted way
export function displayCombinations(combinations: StoredCombination[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  
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

// Function to save combinations to localStorage
export function saveCombinationsToStorage(program: any, combinations: string[][]): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  const storedData: StoredCombination = {
    program: program.program,
    college: program.college || "Unknown College",
    campus: program.campus,
    combinations: combinations,
    coreSubjects: program["core subjects"] ? 
      program["core subjects"].split(',').map((s: string) => s.trim()) : 
      []
  };

  const existingData = localStorage.getItem('programCombinations');
  let allCombinations: StoredCombination[] = [];
  
  if (existingData) {
    try {
      allCombinations = JSON.parse(existingData);
    } catch (error) {
      console.error('Error parsing existing combinations:', error);
    }
  }

  // Remove any existing entry for this program and campus
  allCombinations = allCombinations.filter(
    item => !(item.program === storedData.program && item.campus === storedData.campus)
  );

  // Add new entry
  allCombinations.push(storedData);

  // Save back to localStorage
  localStorage.setItem('programCombinations', JSON.stringify(allCombinations));
}