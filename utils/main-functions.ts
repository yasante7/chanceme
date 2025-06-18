export function handleNoMain(studentSubjects: string[]) {
    return { qualifiesMain: true, remainSubjects: studentSubjects, matches: [] };
}

export function isFlatStringArray(main: unknown): boolean {
    return Array.isArray(main) && main.every(item => typeof item === "string");
  }
  
export function handleRegularMain(studentSubjects: string[], mains: string[]) {
    const matched = mains.filter(subject => studentSubjects.includes(subject));
    const remainSubjects = studentSubjects.filter(subject => !matched.includes(subject));
    if (matched.length === mains.length) { // Student has both main subjects
      return {qualifiesMain: true, remainSubjects, matched};
    } else {
        return { qualifiesMain: false, remainSubjects, matched };
    }
}

export function handleNestedMains(studentSubjects: string[], mainGroups: string[][]) {
  if (mainGroups.length > 1) {
    for (const group of mainGroups) {
      const result = handleRegularMain(studentSubjects, group);
      if (result.qualifiesMain) {
        return result;
      }
    }
  } else if (mainGroups.length === 1) {
    const matched = mainGroups[0].filter(subject => studentSubjects.includes(subject));
    const remainSubjects = studentSubjects.filter(subject => !matched.includes(subject));
    
    if (matched.length > 0) {
      return {
        qualifiesMain: true,
        remainSubjects,
        matched: [matched] // 🔁 Keep as nested array
      };
    }
  }

  // No match
  return {
    qualifiesMain: false,
    remainSubjects: studentSubjects,
    matched: []
  };
}

export function handleAlternativeMains(studentSubjects: string[], alternativeMainGroups: (string[] | string[][])[]) {
  for (const group of alternativeMainGroups) {
    // Case: group is a flat array of strings
    if (Array.isArray(group) && group.every(item => typeof item === "string")) {
      const matched = group.filter(subject => studentSubjects.includes(subject));
      const remainSubjects = studentSubjects.filter(subject => !matched.includes(subject));

      if (matched.length === group.length) {
        return {
          qualifiesMain: true,
          remainSubjects,
          matched: matched // Not nested
        };
      }
    }

    // Case: group is a nested array (group of groups)
    if (Array.isArray(group) && Array.isArray(group[0])) {
      for (const subgroup of group as string[][]) {
        const matched = subgroup.filter(subject => studentSubjects.includes(subject));
        const remainSubjects = studentSubjects.filter(subject => !matched.includes(subject));

        if (matched.length === subgroup.length) {
          return {
            qualifiesMain: true,
            remainSubjects,
            matched: [matched] // Keep as nested
          };
        }
      }
    }
  }

  return {
    qualifiesMain: false,
    remainSubjects: studentSubjects,
    matched: []
  };
}
