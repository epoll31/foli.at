"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { error, data } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    redirect("?error=login-failed");
  }

  // const tag = data!.user.user_metadata.username as string;
  // revalidatePath(`/${username}`, "layout");
  // redirect(`/${username}`);

  revalidatePath("/profile", "layout");
  redirect("/profile");
}
