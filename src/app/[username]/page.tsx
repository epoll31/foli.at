import { testData } from "@/lib/testData";
import { RedirectType, redirect } from "next/navigation";
import Links from "./components/Links";
import WorkHistory from "./components/WorkHistory";
import EducationHistory from "./components/EducationHistory";
import EditButton from "./components/EditButton";
import { createClient } from "@/utils/supabase/server";
import { loadPortfolioGroup } from "@/utils/supabase/actions/loadPortfolioGroup";
import { getUserIdFromUsername } from "@/utils/supabase/actions/getUserIdFromUsername";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createClient();

  const user_id = await getUserIdFromUsername(params.username);
  const portfolioGroup = await loadPortfolioGroup(user_id);

  if (!portfolioGroup) {
    redirect("/", RedirectType.replace);
  }

  const { error } = await supabase.auth.getUser();
  const editable = error == null;

  return (
    <div className="flex flex-col items-center relative">
      <h2 className="text-4xl">{portfolioGroup.portfolio.display_name}</h2>
      <p className="text-2xl">{portfolioGroup.portfolio.title}</p>
      <p className="text-sm my-4">{portfolioGroup.portfolio.bio}</p>

      <Links links={portfolioGroup?.links} />

      {/* <WorkHistory workHistory={user.workHistory} />
      <EducationHistory educationHistory={user.educationHistory} /> */}

      {editable && <EditButton />}
    </div>
  );
}
