import { testData } from "@/lib/testData";
import { RedirectType, redirect } from "next/navigation";
import Links from "./components/Links";
import WorkHistory from "./components/WorkHistory";
import EducationHistory from "./components/EducationHistory";
import EditButton from "./components/EditButton";
import { createClient } from "@/utils/supabase/server";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const user = testData.find((user) => user.username === params.username);

  if (!user) {
    redirect("/", RedirectType.replace);
  }

  const supabase = createClient();
  const { error } = await supabase.auth.getUser();
  const editable = error == null;
  console.log("error", error);
  console.log("editable", editable);

  return (
    <div className="flex flex-col items-center relative">
      <h2 className="text-4xl">{user.fullName}</h2>
      <p className="text-2xl">{user.title}</p>
      <p className="text-sm my-4">{user.bio}</p>

      <Links links={user.links} />

      <WorkHistory workHistory={user.workHistory} />
      <EducationHistory educationHistory={user.educationHistory} />

      {editable && <EditButton />}
    </div>
  );
}
