import { GradeData } from '@/types/user'
import { ProgramResult } from './program-checker'; // Importing ProgramResult type for type safety

const gradePoints: Record<string, number> = {
    'A1': 1, 'B2':2, 'B3':3, 'C4':4, 'C5':4, 'C6':4, 'D7':7, 'E8':8, 'F9':9
}

export function calculateAggregate(
    programname: string, schoolname: string, campus: string, college: string, cutoffPoint: number, specialReq: string | null, combinations: string[][], gradeData: GradeData
): ProgramResult[] {
    const electiveSubjects = gradeData.elective_subjects.map(s => s.subject);
    const electiveGrades = gradeData.elective_subjects.map(g => g.grade);
    const coreGrades = gradeData.core_subjects.map(g => g.grade);
    const coreAggregate = coreGrades.slice(0, 3).map(grade => gradePoints[grade]).reduce((a, b) => a + b, 0);

    let bestAggregate = Infinity;

    // Find the combination that gives the best aggregate score
    for (const combination of combinations) {
        const electiveAggregate = combination
            .map(subject => {
                const index = electiveSubjects.indexOf(subject);
                return index !== -1 ? gradePoints[electiveGrades[index]] : 0;
            })
            .reduce((a, b) => a + b, 0);

        const totalAggregate = coreAggregate + electiveAggregate;

        // Keep track of the best combination
        if (totalAggregate < bestAggregate) {
            bestAggregate = totalAggregate;
        }
    }

    // Only create one program result with the best aggregate score
    if (bestAggregate < Infinity && bestAggregate < cutoffPoint) {
        return [{
            program: programname,
            cutoffPoint: cutoffPoint,
            Aggregate: bestAggregate,
            college: college,
            campus: campus,
            specialRequirements: specialReq,
            validCombinations: combinations, // Still include all valid combinations
            schoolName: schoolname
        }];
    }

    return []; // Return empty array if no qualifying combinations
}
