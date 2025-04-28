// Helper function to check if all passed in subjects meets < D7 requirement
// Useful for checkingboth core and elective subjects combinations
export function validGradesCheck(Grades: string[], Subjects: string[]): { qualifies: boolean; invalidSubjects: { [key: string]: string } } {

    const validGrades = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6'];
    const socialStudiesRequired = ["BA. Political Studies", "BA. History"];
    const invalidSubjects: { [key: string]: string } = {};
  
    // Check if all grades are valid
    for (const grade of Grades) {
      if (!validGrades.includes(grade)) {
        const subjectIndex = Grades.indexOf(grade);
        const subjectName = Subjects[subjectIndex];
        invalidSubjects[subjectName] = grade; // Store invalid subject and grade
      }
    }
  
    let qualifies = true; // Assume qualifies unless proven otherwise
  
    if (Object.keys(invalidSubjects).length > 0) {
      console.log("Invalid subjects and grades:", JSON.stringify(invalidSubjects, null, 2));
      qualifies = false; // Invalid subjects found
    }
    
    return {qualifies, invalidSubjects }; 
  }