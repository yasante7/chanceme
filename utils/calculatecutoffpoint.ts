import { GradeData, Program } from '@/types/user'
import { ProgramResult } from './program-checker';

const gradePoints: Record<string, number> = {
    'A1': 1, 'B2':2, 'B3':3, 'C4':4, 'C5':4, 'C6':4, 'D7':7, 'E8':8, 'F9':9
}

export function calculateAggregate(schoolName: string, program: Program, combinations: string[][], gradeData: GradeData): ProgramResult[] {
    const electiveSubjects = gradeData.elective_subjects.map(s => s.subject);
    const electiveGrades = gradeData.elective_subjects.map(g => g.grade);
    
    const results: ProgramResult[] = []; // <-- Collect results here

    // for (const schoolData of allSchoolsData){

    const cutoffPoint = program["cutoff point"]?.["firstChoiceSubjectArea"] ?? Infinity;
    const mainCoreGrades = [
        gradeData.core_subjects.find(s => s.subject === "English Language")?.grade,
        gradeData.core_subjects.find(s => s.subject === "Mathematics")?.grade,
    ];
    const altGrades = program.alternatecore ?
        (Array.isArray(program.alternatecore) ? program.alternatecore : [program.alternatecore])
            .map(subject => gradeData.core_subjects.find(s => s.subject === subject)?.grade)
            .filter(grade => grade !== undefined) : [];

    const bestAltGrade = altGrades.length > 0
        ? altGrades.reduce((best, current) =>
            gradePoints[current] < gradePoints[best] ? current : best)
        : undefined;
    mainCoreGrades.push(bestAltGrade);

    const coreAggregate =  mainCoreGrades.filter((grade): grade is string => grade !== undefined).map(grade => gradePoints[grade]).reduce((a, b) => a + b, 0);

    let bestAggregate = Infinity;

    for (const combination of combinations) {
        const electiveAggregate = combination
            .map(subject => {
                const index = electiveSubjects.indexOf(subject);
                return index !== -1 ? gradePoints[electiveGrades[index]] : 0;
            })
            .reduce((a, b) => a + b, 0);

        const totalAggregate = coreAggregate + electiveAggregate;

        if (totalAggregate < bestAggregate) {
            bestAggregate = totalAggregate;
        }
    }

    if (bestAggregate < Infinity && bestAggregate < cutoffPoint) {
        results.push({
            program: program.program,
            cutoffPoint: cutoffPoint,
            Aggregate: bestAggregate,
            college: program.college,
            campus: program.campus,
            specialRequirements: program['special requirements / general information'],
            validCombinations: combinations,
            schoolName: schoolName
        });
    }
    return results; // <-- Return all qualifying programs
}