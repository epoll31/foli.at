"use server";

import { createClient } from "@/utils/supabase/server";

export async function getUserIdFromTag(tag: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("portfolio")
    .select("user_id")
    .eq("tag", tag)
    .single();

  if (error) {
    console.error("Error getting user ID from tag:", error.message);
    return undefined;
  }

  return data!.user_id;
}
