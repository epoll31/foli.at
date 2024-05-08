import { createClient } from "@/utils/supabase/server";
import { RedirectType, redirect } from "next/navigation";
import EditPorfolioForm from "./components/EditPorfolioForm";

export default async function EditPage() {
  const supabase = createClient();

  const { error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error loading user:", error.message);
    redirect("/", RedirectType.replace);
  }

  return (
    <div className="p-20 flex flex-col items-center  max-w-prose gap-10">
      <h2 className="text-4xl">Edit Your Portfolio</h2>

      <EditPorfolioForm />
    </div>
  );
}
