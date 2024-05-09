"use server";

import { EducationEntry, Link, NoId, Portfolio, WorkEntry } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

export async function updatePortfolio(
  portfolio: Portfolio,
  links: NoId<Link>[],
  workEntries: NoId<WorkEntry>[],
  educationEntries: EducationEntry[]
) {
  const supabase = createClient();
  const { data: newPortfolio, error: portfolioError } = await supabase
    .from("portfolio")
    .update({
      ...portfolio,
      edited_last: new Date(),
    })
    .eq("id", portfolio.id)
    .select()
    .single();

  if (portfolioError) {
    console.error("Error creating portfolio:", portfolioError.message);
    return null;
  }

  // Using the portfolio ID, insert related links, education entries, and work entries
  const portfolioId = newPortfolio.id;

  // Helper function to insert related items
  async function updateRelatedItems<T>(table: string, items: T[]) {
    const { data: existingItems, error: existingItemsError } = await supabase
      .from(table)
      .select()
      .eq("portfolio_id", portfolioId);

    if (existingItemsError) {
      console.error(`Error fetching existing ${table}s:`, existingItemsError);
      return;
    }

    // Delete existing items
    if (existingItems && existingItems.length > 0) {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq("portfolio_id", portfolioId);
      if (error) {
        console.error(`Error deleting existing ${table}s:`, error.message);
      }
    }

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

  await updateRelatedItems("link", links);
  await updateRelatedItems("workEntry", workEntries);
  await updateRelatedItems("educationEntry", educationEntries);

  return newPortfolio; // Return the created portfolio
}
