export type NoId<T> = Omit<T, "id">;

export interface Portfolio {
  id: number; // int8
  tag: string; // text
  full_name: string; // text
  bio: string; // text
  title: string; // text
}

export const LinkTypes = [
  "github",
  "linkedin",
  "twitter",
  "portfolio",
  "other",
] as const;
export type LinkType = (typeof LinkTypes)[number];
export interface Link {
  id: number; // int8
  href: string; // text
  type: LinkType; // text
}

export interface EducationEntry {
  id: number; // int8
  school: string; // text
  degree: string; // text
  major: string | null; // text
  description: string; // text
  start_date: Date; // timestamptz
  end_date: Date | null; // timestamptz
}

export interface WorkEntry {
  id: number; // int8
  title: string; // text
  company: string; // text
  description: string; // text
  start_date: Date; // timestamptz
  end_date: Date | null; // timestamptz
}

export interface PortfolioGroup {
  portfolio: Portfolio;
  links: Link[];
  educationEntries: EducationEntry[];
  workEntries: WorkEntry[];
}
