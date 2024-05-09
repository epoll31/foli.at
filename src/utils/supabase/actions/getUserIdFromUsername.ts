"use server";

import { createClient } from "@/utils/supabase/server";

export async function getUserIdFromUsername(username: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profile")
    .select("user_id")
    .eq("username", username)
    .single();

  if (error) {
    console.error("Error getting user ID from username:", error.message);
    return undefined;
  }

  return data!.user_id;
}
