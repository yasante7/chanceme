// Generic function to handle tracks of subjects
import { generateSubjectCombinations } from "./handlecombinations";

// Function to remove duplicates from combinations of subjects
function removeNestedArrayDups(array: string[][]): string[][] {
  const seen = new Set<string>();
  const result: string[][] = [];

  for (const item of array) {
      const serialized = JSON.stringify(item);
      if (!seen.has(serialized)) {
          seen.add(serialized);
          result.push(item);
      }
  }

  return result;
}

export function handleTracks(remainSubjects: string[], tracks: Tracks, matches: string[] | string[][]) {
  const trackKeys = Object.keys(tracks);
  const matchedSubjects: Tracks = {};  // to record matches per track

  // Looping through each track
  for (const key of trackKeys) {
    const trackObjects = tracks[key];
    if (!trackObjects) continue;  // 🚀 Skip if undefined
    matchedSubjects[key] = [];  // Initialize empty array for the current track

    // Looping through each element of a track: can be string or list
    for (const subject of trackObjects) {
      if (typeof subject === "string") {
        // Single subject
        if (remainSubjects.includes(subject)) {
          matchedSubjects[key].push([subject]);  // Wrap in array to keep consistent structure
        }
      } else if (Array.isArray(subject)) {
        // Nested options: match all possible subjects in the group
        const foundInGroup = subject.filter(opt => remainSubjects.includes(opt));

        if (foundInGroup.length > 0) {
          matchedSubjects[key].push(foundInGroup);
        }
      }
    }
  }

  // Prepare a collector for qualifiedSubjects and validCombinations
  const allQualifiedSubjects: string[][] = [];
  const allValidCombinations: string[][] = [];
  const requiredElectives = 3 - matches.length; // Count remaining electives after matching
  console.log("Required electives to match:", requiredElectives);

  for (const trackName in matchedSubjects) {
    const matchedSubjectsInTrack = matchedSubjects[trackName];
    if (!matchedSubjectsInTrack) continue; // Skip if undefined

    if (matchedSubjectsInTrack.length >= requiredElectives) {
      const normalizedSubjects = matchedSubjectsInTrack.map(subject =>
        typeof subject === 'string' ? [subject] : subject
      );
      const combinations = generateSubjectCombinations (normalizedSubjects, matches);
      console.log(`${combinations.length} Combinations created for track ${trackName}:`, combinations);
      allValidCombinations.push(...combinations);  // collect combinations
      allQualifiedSubjects.push(...normalizedSubjects);  // collect all qualified subjects
    }
    }
  
  return {
    matchedSubjects, 
    allQualifiedSubjects: removeNestedArrayDups(allQualifiedSubjects),
    allValidCombinations: removeNestedArrayDups(allValidCombinations)
  } as TrackResult; // Return the matched subjects and combinations
}  

type Tracks = Record<string, string[][] | (string | string[])[] | undefined>;
interface TrackResult {
  matchedSubjects: Tracks;
  allQualifiedSubjects: string[][];
  allValidCombinations: string[][];
}