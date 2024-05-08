"use server";

import { Portfolio } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

export async function loadPortfolio(user_id: string) {
  const supabase = createClient();

  const { data: portfolio, error: portfolioError } = await supabase
    .from("portfolio")
    .select()
    .eq("user_id", user_id)
    .single();

  return portfolio as Portfolio | null;
}
