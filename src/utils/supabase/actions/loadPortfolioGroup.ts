"use server";

import { Portfolio, PortfolioGroup } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

export async function loadPortfolioGroup(
  user_id: string
): Promise<PortfolioGroup> {
  const supabase = createClient();

  const { data: portfolio, error: portfolioError } = await supabase
    .from("portfolio")
    .select()
    .eq("user_id", user_id)
    .single();

  return {
    portfolio: portfolio as Portfolio,
    links: [],
    educationEntries: [],
    workEntries: [],
  };
}
