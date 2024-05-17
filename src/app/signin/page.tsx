import BackgroundGrid from "@/components/BackgroundGrid";
import SignInForm from "@/components/forms/SignInForm";
import Card from "@/components/ui/Card";

export default function SignInPage() {
  return (
    <>
      <BackgroundGrid size={30} fade fadeFrom="30%" fadeTo="100%" />
      {/* <Card className="p-0 border border-neutral-200">
        <div className="px-4 py-4 rounded-t-xl bg-neutral-100 border-neutral-200 border-b">
          <h2 className="text-center font-semibold text-2xl text-blue-400">
            Sign In
          </h2>
        </div>
        <SignInForm />
      </Card> */}
      <div className="rounded-xl overflow-hidden bg-zinc-700 shadow-lg">
        <div className="sm:px-16  py-6 bg-zinc-600 text-zinc-800">
          <h2 className="text-3xl md:text-4xl text-center text-nowrap">
            Sign In
          </h2>
        </div>
        <div className="">
          <SignInForm />
        </div>
      </div>
    </>
  );
}
