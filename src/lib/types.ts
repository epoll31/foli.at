export interface Portfolio {
  id: number; // int8
  created_at: Date; // timestampz
  edited_last: Date; // timestampz
  display_name: string; // text
  bio: string; // text
  title: string; // text
}

export interface Link {
  id: number; // int8
  portfolio_id: number; // int8
  created_at: Date; // timestampz
  href: string; // text
  type: "github" | "linkedin" | "twitter" | "portfolio" | "other"; // text
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
