"use server";

import { createClient } from "@/utils/supabase/server";

export async function loadPortfolio(username: string) {
  const supabase = createClient();

  // TODO: fetch user data from supabase
}
