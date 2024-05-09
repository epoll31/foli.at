"use server";

import { createClient } from "@/utils/supabase/server";

export async function getUsernameFromUserId(user_id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profile")
    .select("username")
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error("Error getting username from user id:", error.message);
    return undefined;
  }

  return data!.username;
}
