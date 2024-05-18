import { RedirectType, redirect } from "next/navigation";
import PortfolioForm from "@/components/forms/PortfolioForm/Form";

import BackgroundGrid from "@/components/BackgroundGrid";
import { auth } from "@/auth";
import { EmptyPortfolio } from "@/lib/types";
import { SessionProvider } from "next-auth/react";
import getPortfolio from "@/utils/actions/getPortfolio";

export default async function PortfolioPage() {
  const session = await auth();
  const email = session?.user?.email;
  if (!session || !email) {
    redirect("/signin", RedirectType.replace);
  }
  const portfolio = (await getPortfolio({ email })) || EmptyPortfolio;

  return (
    <SessionProvider session={session}>
      <BackgroundGrid size={30} fade fadeFrom="20%" fadeTo="100%" />
      <div className="rounded-xl overflow-hidden bg-theme-bg-secondary drop-shadow-lg border border-theme-border-primary">
        <div className="sm:px-16  py-6 border-b border-b-theme-border-primary">
          <h2 className="text-theme-text-primary text-3xl md:text-4xl text-center text-nowrap">
            Edit Your Portfolio
          </h2>
        </div>
        <div className="">
          <PortfolioForm portfolio={portfolio} email={email} />
        </div>
      </div>
    </SessionProvider>
  );
}
