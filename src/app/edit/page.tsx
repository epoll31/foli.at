import { createClient } from "@/utils/supabase/server";
import { RedirectType, redirect } from "next/navigation";

export default async function EditPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error loading user:", error.message);
    redirect("/", RedirectType.replace);
  }

  return (
    <div className="p-20 flex flex-col items-center  max-w-prose">
      <h2 className="text-4xl">Edit Your Portfolio</h2>
    </div>
  );
}
