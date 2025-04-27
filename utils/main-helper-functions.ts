function handleNoMain(studentSubjects: string[]) {
    console.log("No main subject required, checking electives only");
    return { qualifiesMain: true, remainSubjects: studentSubjects };

    // Next, check if the student has any electives that match the program's electives in the tracks
    // If the student has at least 3 electives, they qualify
  }

function handleRegularMain(studentSubjects: string[], mains: string[], matches: string[]) {
    const matched = mains.filter(subject => studentSubjects.includes(subject));
    const remainSubjects = studentSubjects.filter(subject => !matched.includes(subject));
    matches.push(...matched);
    if (matched.length === mains.length) { // Student has both main subjects
        return {qualifiesMain: true, remainSubjects};
    } else {
        console.log("Student does not qualify. Missing these mains:", mains.filter(subject => !matched.includes(subject)));   
        return { qualifiesMain: false, remainSubjects };
    }
}

function handleNestedMains(studentSubjects: string[], mainGroups: string[][], matches: string[]) {
    for (const group of mainGroups) {
      const result = handleRegularMain(studentSubjects, group, matches);
      if (result.qualifiesMain) {
        return result; // student qualifies with this group
      }
    }
    // If none of the groups matched
    console.log("Student does not qualify under any nested main group");
    return { qualifiesMain: false, remainSubjects: studentSubjects };
  }