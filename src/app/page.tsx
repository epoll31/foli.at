import { auth, signOut } from "@/auth";
import SignInForm from "@/components/forms/SignInFormServer";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <h2 className="text-4xl text-center">Build Your Portfolio Now!</h2>
    </>
  );
}
