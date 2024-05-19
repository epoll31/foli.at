import { RedirectType, redirect } from "next/navigation";
import Links from "./components/Links";
import WorkSection from "./components/WorkSection";
import EducationSection from "./components/EducationSection";
import getPortfolio from "@/utils/actions/getPortfolio";
import { Portfolio } from "@/lib/types";
import NotFound from "@/components/NotFound";

export default async function Page({ params }: { params: { tag: string } }) {
  const portfolio = await getPortfolio({ tag: params.tag });

  if (!portfolio) {
    return <NotFound tag={params.tag} />;
  }

  return <ShowPortfolio portfolio={portfolio} />;
}

function ShowPortfolio({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="max-w-prose flex flex-col gap-3 items-center">
      <h2 className="text-4xl text-center">{portfolio.fullName}</h2>
      <p className="text-2xl text-center">{portfolio.title}</p>
      <p className="text-sm my-4">{portfolio.description}</p>

      {portfolio.links.length > 0 && <Links links={portfolio.links} />}
      {portfolio.workHistories.length > 0 && (
        <WorkSection workHistory={portfolio.workHistories} />
      )}
      {portfolio.educationHistories.length > 0 && (
        <EducationSection educationHistories={portfolio.educationHistories} />
      )}
    </div>
  );
}

function ShowMissingPortfolio() {
  return (
    <div className="max-w-prose flex flex-col gap-3 items-center">
      <h2 className="text-4xl text-center">404</h2>
      <p className="text-2xl text-center">Portfolio not found</p>
    </div>
  );
}
