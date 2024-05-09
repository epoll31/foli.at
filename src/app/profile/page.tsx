import { createClient } from "@/utils/supabase/server";
import { RedirectType, redirect } from "next/navigation";
import UpdatePorfolioForm from "./components/UpdatePorfolioForm";
import { loadPortfolioGroup } from "@/utils/supabase/actions/loadPortfolioGroup";

export default async function EditPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error loading user:", error.message);
    redirect("/", RedirectType.replace);
  }

  const user_id = data!.user.id as string;
  const portfolioGroup = await loadPortfolioGroup(user_id);

  return (
    <div className="p-20 flex flex-col items-center  max-w-prose gap-10">
      <h2 className="text-4xl">Edit Your Portfolio</h2>

      <UpdatePorfolioForm portfolioGroup={portfolioGroup} />
    </div>
  );
}
