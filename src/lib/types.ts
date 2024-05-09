export interface Portfolio {
  id: number; // int8
  created_at: Date; // timestampz
  edited_last: Date; // timestampz
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
  portfolio_id: number; // int8
  created_at: Date; // timestampz
  href: string; // text
  type: LinkType; // text
}

export interface EducationEntry {
  id: number; // int8
  portfolio_id: number; // int8
  created_at: Date; // timestampz
  school: string; // text
  degree: string; // text
  description: string; // text
  start_date: Date; // timestamptz
  end_date: Date; // timestamptz
}

export interface WorkEntry {
  id: number; // int8
  portfolio_id: number; // int8
  created_at: Date; // timestampz
  title: string; // text
  company: string; // text
  description: string; // text
  start_date: Date; // timestamptz
  end_date: Date; // timestamptz
}

export interface PortfolioGroup {
  portfolio: Portfolio;
  links: Omit<Link, "portfolio_id" | "created_at">[];
  educationEntries: EducationEntry[];
  workEntries: WorkEntry[];
}
