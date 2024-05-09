export interface Portfolio {
  id: number; // int8
  display_name: string; // text
  bio: string; // text
  title: string; // text
}

export type LinkType =
  | "github"
  | "linkedin"
  | "twitter"
  | "portfolio"
  | "other";
export interface Link {
  id: number; // int8
  href: string; // text
  type: LinkType; // text
}

export interface EducationEntry {
  id: number; // int8
  school: string; // text
  degree: string; // text
  description: string; // text
  start_date: Date; // timestamptz
  end_date: Date; // timestamptz
}

export interface WorkEntry {
  id: number; // int8
  title: string; // text
  company: string; // text
  description: string; // text
  start_date: Date; // timestamptz
  end_date: Date; // timestamptz
}

export interface PortfolioGroup {
  portfolio: Portfolio;
  links: Link[];
  educationEntries: EducationEntry[];
  workEntries: WorkEntry[];
}
