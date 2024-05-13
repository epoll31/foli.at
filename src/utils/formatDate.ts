export const DateDisplayOptions = {
  month: "short",
  year: "numeric",
} as Intl.DateTimeFormatOptions;

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", DateDisplayOptions);
}

export function formatISODate(date: Date): string {
  return date instanceof Date ? date.toISOString().slice(0, 7) : "";
}
export function formatDateToMonthYear(date: Date | null | undefined) {
  if (!date) return undefined;

  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Ensure two digits
  const output = `${year}-${month}`;

  // console.log(date);
  // console.log(output);

  return output;
}
