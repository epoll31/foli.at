import { createClient } from "@/utils/supabase/server";
import { RedirectType, redirect } from "next/navigation";
import UpdatePorfolioForm from "./components/UpdatePorfolioForm";
import { loadPortfolio } from "@/utils/supabase/actions/loadPortfolio";

export default async function EditPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error loading user:", error.message);
    redirect("/", RedirectType.replace);
  }

  const user_id = data!.user.id as string;
  const portfolio = await loadPortfolio(user_id);
  // console.log("portfolio", portfolio);

  return (
    <div className="p-20 flex flex-col items-center  max-w-prose gap-10">
      <h2 className="text-4xl">Edit Your Portfolio</h2>

      <UpdatePorfolioForm portfolio={portfolio} />
    </div>
  );
}
