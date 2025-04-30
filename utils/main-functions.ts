export function handleNoMain(studentSubjects: string[]) {
    console.log("No main subject required, checking electives only");
    return { qualifiesMain: true, remainSubjects: studentSubjects, matches: [] };
}

export function isFlatStringArray(main: any): boolean {
    return Array.isArray(main) && main.every(item => typeof item === "string");
  }
  
export function handleRegularMain(studentSubjects: string[], mains: string[]) {
    const matched = mains.filter(subject => studentSubjects.includes(subject));
    const remainSubjects = studentSubjects.filter(subject => !matched.includes(subject));
    if (matched.length === mains.length) { // Student has both main subjects
      console.log("✅ Student qualifies with mains:", matched);
      return {qualifiesMain: true, remainSubjects, matched};
    } else {
        console.log("Student does not qualify. Missing these mains:", mains.filter(subject => !matched.includes(subject)));   
        return { qualifiesMain: false, remainSubjects, matched };
    }

}

export function handleNestedMains(studentSubjects: string[], mainGroups: string[][]) {
  for (const group of mainGroups) {
    const matched = group.filter(subject => studentSubjects.includes(subject));
    const remainSubjects = studentSubjects.filter(subject => !matched.includes(subject));
    
    if (matched.length > 0) {
      console.log(`Matched subjects from group ${JSON.stringify(group)}:`, matched);
      return {
        qualifiesMain: true,
        remainSubjects,
        matched: [matched] // 🔁 Keep as nested array
      };
    }
  }

  // No match
  console.log("Student does not qualify under any nested main group");
  return {
    qualifiesMain: false,
    remainSubjects: studentSubjects,
    matched: []
  };
}