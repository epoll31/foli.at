import { RedirectType, redirect } from "next/navigation";
import Links from "./components/Links";
import WorkSection from "./components/WorkSection";
import EducationSection from "./components/EducationHistory";

export default async function Page({ params }: { params: { tag: string } }) {
  redirect("/", RedirectType.replace);
  // const user_id = await getUserIdFromTag(params.tag);
  // const portfolioGroup = await loadPortfolioGroup(user_id);

  // if (!portfolioGroup) {
  //   redirect("/", RedirectType.replace);
  // }

  // return (
  //   <>
  //     <h2 className="text-4xl text-center">
  //       {portfolioGroup.portfolio.full_name}
  //     </h2>
  //     <p className="text-2xl text-center">{portfolioGroup.portfolio.title}</p>
  //     <p className="text-sm my-4">{portfolioGroup.portfolio.bio}</p>

  //     {portfolioGroup.links.length > 0 && (
  //       <Links links={portfolioGroup.links} />
  //     )}
  //     {portfolioGroup.workEntries.length > 0 && (
  //       <WorkSection workHistory={portfolioGroup.workEntries} />
  //     )}
  //     {portfolioGroup.educationEntries.length > 0 && (
  //       <EducationSection
  //         educationHistories={portfolioGroup.educationEntries}
  //       />
  //     )}
  //   </>
  // );
}
