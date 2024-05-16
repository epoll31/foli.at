import { auth } from "@/auth";

import getUserByEmail from "@/utils/actions/getUserByEmail";
import SignOutButton from "./SignOutButton";
import getPortfolio from "@/utils/actions/getPortfolio";
import { RedirectType, redirect } from "next/navigation";

export default async function SettingsPage() {
  redirect("/", RedirectType.replace);

  // const session = await auth();
  // const email = session?.user?.email;
  // if (!email) {
  //   return <p className="text-center">You are not authenticated.</p>;
  // }
  // const { id: userId } = await getUserByEmail(email);
  // console.log("User ID:", userId);
  // const portfolio = await getPortfolio({ email });

  // return (
  //   <>
  //     <h2 className="text-4xl text-center">Settings!</h2>
  //     <p className="text-center">User ID: {userId ? userId : "null"}</p>
  //     <p className="text-center">Email: {email}</p>
  //     <p className="text-center">Portfolio: {portfolio ? "exists" : "null"}</p>
  //     <p className="text-center">Tag: {portfolio?.tag}</p>
  //     <SignOutButton />
  //   </>
  // );
}
