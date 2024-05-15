import { auth, signOut } from "@/auth";
import SignInForm from "@/components/forms/SignInFormServer";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <h2 className="text-4xl text-center">Build Your Portfolio Now!</h2>
      {session ? (
        <>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit" className="bg-red-200 rounded-lg px-3 py-1">
              Sign Out
            </button>
          </form>
        </>
      ) : (
        <SignInForm />
      )}
    </>
  );
}
