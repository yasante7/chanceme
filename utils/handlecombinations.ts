// Function to generate all combinations of 3 subjects from the matched subjects
export function generateSubjectCombinations(matchedSubjects: string[][]) {
    const allOptions: string[][] = matchedSubjects.map(group => group);
  
    const results: string[][] = [];
  
    function backtrack(path: string[], index: number) {
      if (path.length === 3) {
        results.push([...path]);
        return;
      }
      if (index >= allOptions.length) return;
  
      for (const subject of allOptions[index]) {
        backtrack([...path, subject], index + 1);
      }
    }
  
    backtrack([], 0);
    return results;
  }