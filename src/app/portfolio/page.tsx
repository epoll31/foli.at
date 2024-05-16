import { createClient } from "@/utils/supabase/server";
import { RedirectType, redirect } from "next/navigation";
import UpdatePorfolioForm from "@/components/forms/PortfolioForm/Form";

import BackgroundGrid from "@/components/BackgroundGrid";
import Card from "@/components/ui/Card";
import { loadPortfolioFromSession } from "@/utils/db/loadPortfolio";
import { auth } from "@/auth";
import { EmptyPortfolio } from "@/lib/types";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) {
    redirect("/signin", RedirectType.replace);
  }
  const portfolio = (await loadPortfolioFromSession()) ?? EmptyPortfolio;

  return (
    <>
      <BackgroundGrid size={30} fade={"40%"} />
      <Card className="p-0 border border-neutral-200 mx-4 w-fit">
        <div className="px-0 py-6 rounded-t-xl bg-neutral-100 border-neutral-200 border-b">
          <h2 className="text-3xl md:text-4xl text-center text-nowrap">
            Edit Your Portfolio
          </h2>
        </div>
        {portfolio && <UpdatePorfolioForm portfolio={portfolio} />}
      </Card>
    </>
  );
}
