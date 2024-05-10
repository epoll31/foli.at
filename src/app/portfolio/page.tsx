import { createClient } from "@/utils/supabase/server";
import { RedirectType, redirect } from "next/navigation";
import UpdatePorfolioForm from "./components/UpdatePorfolioForm";
import { loadPortfolioGroup } from "@/utils/supabase/actions/loadPortfolioGroup";

export default async function ProfilePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error loading user:", error.message);
    redirect("/login", RedirectType.replace);
  }

  const verified = data!.user.email_confirmed_at !== null;

  if (!verified) {
    return (
      <div className=" flex flex-col items-center  max-w-prose gap-10">
        <h2 className="text-4xl">
          Please check your email for a confirmation message.
        </h2>
      </div>
    );
  }

  const user_id = data!.user.id as string;
  const portfolioGroup = await loadPortfolioGroup(user_id);

  return (
    // <div className="flex flex-col items-center ">
    <>
      <h2 className="text-4xl">Edit Your Portfolio</h2>
      {portfolioGroup && <UpdatePorfolioForm portfolioGroup={portfolioGroup} />}
    </>
    // </div>
  );
}
