"use server";

import { Link, EducationEntry, WorkEntry, Portfolio } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

export type LinkData = Omit<Link, "id" | "portfolio_id" | "created_at">;
export type EducationEntryData = Omit<
  EducationEntry,
  "id" | "portfolio_id" | "created_at"
>;
export type WorkEntryData = Omit<
  WorkEntry,
  "id" | "portfolio_id" | "created_at"
>;

export type PortfolioData = Omit<
  Portfolio,
  "id" | "created_at" | "edited_last"
>;

export type PortfolioGroup = {
  portfolio: PortfolioData;
  links: LinkData[];
  educationEntries: EducationEntryData[];
  workEntries: WorkEntryData[];
};

export async function updatePortfolio({
  portfolio,
  links,
  educationEntries,
  workEntries,
}: PortfolioGroup) {
  const supabase = createClient();
  const { data: newPortfolio, error: portfolioError } = await supabase
    .from("portfolio")
    .insert([portfolio])
    .select()
    .single();

  if (portfolioError) {
    console.error("Error creating portfolio:", portfolioError.message);
    return null;
  }

  // Using the portfolio ID, insert related links, education entries, and work entries
  const portfolioId = newPortfolio.id;

  // Helper function to insert related items
  async function insertRelatedItems<T>(
    table: string,
    items: T[],
    portfolioId: number
  ) {
    if (items && items.length > 0) {
      const itemsWithPortfolioId = items.map((item) => ({
        ...item,
        portfolio_id: portfolioId,
        created_at: new Date(),
      }));
      const { error } = await supabase.from(table).insert(itemsWithPortfolioId);
      if (error) {
        console.error(`Error inserting items into ${table}:`, error.message);
      }
    }
  }

  // Insert Links
  await insertRelatedItems("Link", links, portfolioId);

  // Insert Education Entries
  await insertRelatedItems("EducationEntry", educationEntries, portfolioId);

  // Insert Work Entries
  await insertRelatedItems("WorkEntry", workEntries, portfolioId);

  return newPortfolio; // Return the created portfolio
}
