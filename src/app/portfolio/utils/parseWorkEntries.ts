import { NoId, WorkEntry } from "@/lib/types";

export function parseWorkEntries(formData: FormData): NoId<WorkEntry>[] {
  const workEntries: NoId<WorkEntry>[] = [];
  const workEntryMap: Map<number, Partial<NoId<WorkEntry>>> = new Map();

  // Process each key-value pair in the form data
  formData.forEach((value, key) => {
    const match = key.match(
      /^work-(title|company|description|start_date|end_date)-(\d+)$/
    );
    if (match) {
      const [_, dataType, indexStr] = match;
      const index = parseInt(indexStr, 10);

      // Initialize the object in the map if it doesn't already exist
      if (!workEntryMap.has(index)) {
        workEntryMap.set(index, {});
      }

      // Set the type or link based on the key
      if (dataType === "title") {
        workEntryMap.get(index)!.title = value as string;
      } else if (dataType === "company") {
        workEntryMap.get(index)!.company = value as string;
      } else if (dataType === "description") {
        workEntryMap.get(index)!.description = value as string;
      } else if (dataType === "start_date") {
        workEntryMap.get(index)!.start_date = new Date(value as string);
      } else if (dataType === "end_date") {
        workEntryMap.get(index)!.end_date =
          value === "" ? null : new Date(value as string);
      }
    }
  });

  // Convert the map to the final array format
  workEntryMap.forEach((value, key) => {
    if (value.title && value.company && value.description && value.start_date) {
      workEntries.push({
        title: value.title!,
        company: value.company!,
        description: value.description!,
        start_date: value.start_date!,
        end_date: value.end_date!,
      });
    }
  });

  return workEntries;
}
