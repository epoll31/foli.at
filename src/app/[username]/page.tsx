import { testData } from "@/lib/testData";
import { RedirectType, redirect } from "next/navigation";
import Links from "./components/Links";
import WorkHistory from "./components/WorkHistory";

export default function Page({ params }: { params: { username: string } }) {
  const user = testData.find((user) => user.username === params.username);

  if (!user) {
    redirect("/", RedirectType.replace);
  }

  return (
    <div className="p-20 flex flex-col items-center max-w-prose">
      <h2 className="text-4xl">{user.fullName}</h2>
      <p className="text-2xl">{user.title}</p>
      <p className="text-sm my-4">{user.bio}</p>

      <Links links={user.links} />

      <WorkHistory workHistory={user.workHistory} />
    </div>
  );
}
