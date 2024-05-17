import BackgroundGrid from "@/components/BackgroundGrid";
import SignInForm from "@/components/forms/SignInForm";

export default function SignInPage() {
  return (
    <>
      <BackgroundGrid size={30} fade fadeFrom="30%" fadeTo="100%" />
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
