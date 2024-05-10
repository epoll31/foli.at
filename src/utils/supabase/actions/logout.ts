"use server";
import { createClient } from "@/utils/supabase/server";

export default async function logout() {
  const supabase = createClient();

  return supabase.auth.signOut();
}
