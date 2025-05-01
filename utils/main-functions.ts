export function handleNoMain(studentSubjects: string[]) {
    return { qualifiesMain: true, remainSubjects: studentSubjects, matches: [] };
}

export function isFlatStringArray(main: any): boolean {
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
  for (const group of mainGroups) {
    const matched = group.filter(subject => studentSubjects.includes(subject));
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