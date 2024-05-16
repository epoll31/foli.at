import { auth } from "@/auth";

import getUserId from "@/utils/actions/getUserId";
import SignOutButton from "./SignOutButton";
import getPortfolio from "@/utils/actions/getPortfolio";

export default async function SettingsPage() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return <p className="text-center">You are not authenticated.</p>;
  }
  const userId = await getUserId(email);
  console.log("User ID:", userId);
  const portfolio = await getPortfolio({ email });

  return (
    <>
      <h2 className="text-4xl text-center">Settings!</h2>
      <p className="text-center">User ID: {userId ? userId : "null"}</p>
      <p className="text-center">Email: {email}</p>
      <p className="text-center">Portfolio: {portfolio ? "exists" : "null"}</p>
      <p className="text-center">Tag: {portfolio?.tag}</p>
      <SignOutButton />
    </>
  );
}
