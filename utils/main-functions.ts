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
    console.log("Remaining subjects after matching mains:", remainSubjects);
    if (matched.length === mains.length) { // Student has both main subjects
        return {qualifiesMain: true, remainSubjects, matched};
    } else {
        console.log("Student does not qualify. Missing these mains:", mains.filter(subject => !matched.includes(subject)));   
        return { qualifiesMain: false, remainSubjects, matched };
    }
}

export function handleNestedMains(studentSubjects: string[], mainGroups: string[][]) {
    for (const group of mainGroups) {
      const result = handleRegularMain(studentSubjects, group);
      if (result.qualifiesMain) {
        return result; // student qualifies with this group
      }
    }
    // If none of the groups matched
    console.log("Student does not qualify under any nested main group");
    return { qualifiesMain: false, remainSubjects: studentSubjects, matched: [] };
}