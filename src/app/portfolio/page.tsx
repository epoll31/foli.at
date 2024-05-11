import { createClient } from "@/utils/supabase/server";
import { RedirectType, redirect } from "next/navigation";
import UpdatePorfolioForm from "./components/UpdatePorfolioForm";
import { loadPortfolioGroup } from "@/utils/supabase/actions/loadPortfolioGroup";
import BackgroundGrid from "@/components/BackgroundGrid";
import Card from "@/components/ui/Card";

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
      <BackgroundGrid size={30} />
      <Card className="p-0 border border-neutral-200">
        <div className="px-20 py-6 rounded-t-xl bg-neutral-100 border-neutral-200 border-b">
          <h2 className="text-4xl">Edit Your Portfolio</h2>
        </div>
        {portfolioGroup && (
          <UpdatePorfolioForm portfolioGroup={portfolioGroup} />
        )}
      </Card>
    </>
    // </div>
  );
}
