"use server";

import { createClient } from "@/utils/supabase/server";

export async function getTagFromUserId(user_id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("portfolio")
    .select("tag")
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error("Error getting tag from user id:", error.message);
    return undefined;
  }

  return data!.tag;
}
