// Generic function to handle tracks of subjects
export function handleTracks(remainSubjects: string[], tracks: Tracks, matches: string[]) {
  const trackKeys = Object.keys(tracks);
  const matchedSubjects: Tracks = {};  // to record matches per track

  // Looping through each track
  for (const key of trackKeys) {
    const trackList = tracks[key];
    if (!trackList) continue;  // 🚀 Skip if undefined

    matchedSubjects[key] = [];  // Initialize empty array for the current track

    // Looping through each element of a track: can be string or list
    for (const subject of trackList) {
      if (typeof subject === "string") {
        // Single subject
        if (remainSubjects.includes(subject)) {
          matchedSubjects[key].push([subject]);  // Wrap in array to keep consistent structure
          console.log(`✅ Matched Single Subject: ${subject}`);
        } else {
          console.log(`❌ Missed Single Subject: ${subject}`);
        }
      } else if (Array.isArray(subject)) {
        // Nested options: match all possible subjects in the group
        const foundInGroup = subject.filter(opt => remainSubjects.includes(opt));

        if (foundInGroup.length > 0) {
          matchedSubjects[key].push(foundInGroup);
          console.log(`✅ Matched Group [${foundInGroup.join(", ")}]`);
        } else {
          console.log(`❌ Missed Entire Group [${subject.join(", ")}]`);
        }
      }
    }
  }

  // Prepare a collector for qualifiedSubjects and validCombinations
  const allQualifiedSubjects: string[][] = [];
  const allValidCombinations: string[][] = [];
  let requiredElectives = 3 - matches.length; // Count remaining electives after matching
  console.log("Required electives to match:", requiredElectives);

  for (const trackName in matchedSubjects) {
    const matchedSubjectsInTrack = matchedSubjects[trackName];
    console.log(`Matched subjects in track ${trackName}:`, matchedSubjectsInTrack);
    if (!matchedSubjectsInTrack) continue; // Skip if undefined

    if (matchedSubjectsInTrack.length >= requiredElectives) {
      const normalizedSubjects = matchedSubjectsInTrack.map(subject =>
        typeof subject === 'string' ? [subject] : subject
      );
      const combinations = generateThreeSubjectCombinations(normalizedSubjects);
      console.log(`Generated ${combinations.length} combinations for track ${trackName}`);
      allValidCombinations.push(...combinations);  // collect combinations
      allQualifiedSubjects.push(...normalizedSubjects);  // collect all qualified subjects
    }
    }

    console.log("Matched Subjects per Track:", JSON.stringify(matchedSubjects, null, 2));
  return {matchedSubjects, allQualifiedSubjects, allValidCombinations}; // Return the matched subjects and combinations
}  


// Function to generate all combinations of 3 subjects from the matched subjects
export function generateThreeSubjectCombinations(matchedSubjects: string[][]) {
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
  

  type Tracks = Record<string, (string | string[])[] | undefined>;
