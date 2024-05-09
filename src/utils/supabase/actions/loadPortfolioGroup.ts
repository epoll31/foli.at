"use server";

import { Link, Portfolio, PortfolioGroup, WorkEntry } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

export async function loadPortfolioGroup(
  user_id: string
): Promise<PortfolioGroup | undefined> {
  const supabase = createClient();

  const { data: portfolio, error: portfolioError } = await supabase
    .from("portfolio")
    .select()
    .eq("user_id", user_id)
    .single();

  if (portfolioError) {
    console.error("Error loading portfolio:", portfolioError);
    return undefined;
  }

  const { data: links, error: linksError } = await supabase
    .from("link")
    .select("href, type, id")
    .eq("portfolio_id", portfolio.id);

  if (linksError) {
    console.error("Error loading links:", linksError.message);
    return undefined;
  }

  const { data: workEntries, error: workEntriesError } = await supabase
    .from("workEntry")
    .select("title, company, start_date, end_date, id, description")
    .eq("portfolio_id", portfolio.id);

  if (workEntriesError) {
    console.error("Error loading work entries:", workEntriesError.message);
    return undefined;
  }

  return {
    portfolio: portfolio as Portfolio,
    links: links as Link[],
    educationEntries: [],
    workEntries: workEntries.map((entry) => ({
      ...entry,
      start_date: new Date(entry.start_date),
      end_date: entry.end_date ? new Date(entry.end_date) : null,
    })) as WorkEntry[],
  };
}
