export const DateDisplayOptions = {
  month: "short",
  year: "numeric",
} as Intl.DateTimeFormatOptions;

export default function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", DateDisplayOptions);
}
