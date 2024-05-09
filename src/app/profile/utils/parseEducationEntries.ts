import { NoId, EducationEntry } from "@/lib/types";

export function parseEducationEntries(
  formData: FormData
): NoId<EducationEntry>[] {
  const educationEntries: NoId<EducationEntry>[] = [];
  const educationEntryMap: Map<
    number,
    Partial<NoId<EducationEntry>>
  > = new Map();

  // Process each key-value pair in the form data
  formData.forEach((value, key) => {
    const match = key.match(
      /^education-(school|degree|description|start_date|end_date)-(\d+)$/
    );
    if (match) {
      const [_, dataType, indexStr] = match;
      const index = parseInt(indexStr, 10);

      // Initialize the object in the map if it doesn't already exist
      if (!educationEntryMap.has(index)) {
        educationEntryMap.set(index, {});
      }

      // Set the type or link based on the key
      if (dataType === "school") {
        educationEntryMap.get(index)!.school = value as string;
      } else if (dataType === "degree") {
        educationEntryMap.get(index)!.degree = value as string;
      } else if (dataType === "description") {
        educationEntryMap.get(index)!.description = value as string;
      } else if (dataType === "start_date") {
        educationEntryMap.get(index)!.start_date = new Date(value as string);
      } else if (dataType === "end_date") {
        educationEntryMap.get(index)!.end_date =
          value === "" ? null : new Date(value as string);
      }
    }
  });

  // Convert the map to the final array format
  educationEntryMap.forEach((value, key) => {
    if (value.school && value.degree && value.description && value.start_date) {
      educationEntries.push({
        school: value.school!,
        degree: value.degree!,
        description: value.description!,
        start_date: value.start_date!,
        end_date: value.end_date!,
      });
    }
  });

  return educationEntries;
}
