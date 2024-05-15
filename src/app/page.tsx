import { auth, signIn, signOut } from "@/auth";
import Github from "@/components/icons/github";
import Google from "@/components/icons/google";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <h2 className="text-4xl text-center">Build Your Portfolio Now!</h2>
      {session ? (
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
      ) : (
        <div className="flex flex-col gap-3">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button
              type="submit"
              className="border-2 border-blue-200 bg-transparent hover:bg-blue-200 active:bg-blue-300 rounded-lg px-3 py-2 text-xl w-full flex items-center justify-between gap-3 transition-colors duration-500"
            >
              <Google className="text-2xl" /> Sign in with Google
            </button>
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <button
              type="submit"
              className="border-2 border-blue-200 bg-transparent hover:bg-blue-200 active:bg-blue-300 rounded-lg px-3 py-2 w-full  text-xl flex items-center justify-between gap-3 transition-colors duration-500"
            >
              <Github className="text-2xl" />
              Sign in with GitHub
            </button>
          </form>
        </div>
      )}
    </>
  );
}
