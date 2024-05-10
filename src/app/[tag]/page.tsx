import { RedirectType, redirect } from "next/navigation";
import Links from "./components/Links";
import WorkHistory from "./components/WorkHistory";
import EducationHistory from "./components/EducationHistory";
import { loadPortfolioGroup } from "@/utils/supabase/actions/loadPortfolioGroup";
import { getUserIdFromTag } from "@/utils/supabase/actions/getUserIdFromTag";

export default async function Page({ params }: { params: { tag: string } }) {
  const user_id = await getUserIdFromTag(params.tag);
  const portfolioGroup = await loadPortfolioGroup(user_id);

  if (!portfolioGroup) {
    redirect("/", RedirectType.replace);
  }

  return (
    <>
      <h2 className="text-4xl">{portfolioGroup.portfolio.full_name}</h2>
      <p className="text-2xl">{portfolioGroup.portfolio.title}</p>
      <p className="text-sm my-4">{portfolioGroup.portfolio.bio}</p>

      <Links links={portfolioGroup?.links} />
      <WorkHistory workEntries={portfolioGroup?.workEntries} />
      <EducationHistory educationEntries={portfolioGroup?.educationEntries} />
    </>
  );
}
