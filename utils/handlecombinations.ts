export function generateSubjectCombinations(
  normalizedSubjects: string[][],
  matchedSubjects: string[] | string[][]
): string[][] {
  const results: string[][] = [];
  const isNested = Array.isArray(matchedSubjects[0]);
  const subjectsToPick = (ms: string[]) => 3 - ms.length;

  // Handle flat matchedSubjects (e.g. ["Math", "Physics"])
  if (!isNested) {
    const ms = matchedSubjects as string[];
    if (ms.length >= 3) return [ms.slice(0, 3)];

    function backtrack(path: string[], groupIndex: number) {
      if (path.length === subjectsToPick(ms)) {
        results.push([...ms, ...path]);
        return;
      }

      for (let i = groupIndex; i < normalizedSubjects.length; i++) {
        for (const subject of normalizedSubjects[i]) {
          backtrack([...path, subject], i + 1); // move to next group to avoid reusing
        }
      }
    }

    backtrack([], 0);
    return results;
  }

  // Handle nested matchedSubjects (e.g. [["Core Math", "Elective Math"], ["Physics"]])
  const matchedGroups = matchedSubjects as string[][];

  function pickFromMatched(index = 0, current: string[] = []) {
    if (index === matchedGroups.length) {
      const remaining = 3 - current.length;

      function pickRest(path: string[], groupIndex: number) {
        if (path.length === remaining) {
          results.push([...current, ...path]);
          return;
        }

        for (let i = groupIndex; i < normalizedSubjects.length; i++) {
          for (const subject of normalizedSubjects[i]) {
            pickRest([...path, subject], i + 1); // only pick one from each group
          }
        }
      }

      pickRest([], 0);
      return;
    }

    for (const subject of matchedGroups[index]) {
      pickFromMatched(index + 1, [...current, subject]);
    }
  }

  pickFromMatched();
  return results;
}
