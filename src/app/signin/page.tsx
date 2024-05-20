import BackgroundGrid from "@/components/BackgroundGrid";
import SignInForm from "@/components/forms/SignInForm";
import { cookies } from "next/headers";

export default function SignInPage() {
  const cookieStore = cookies();
  const error = cookieStore.get("error");

  return (
    <>
      <BackgroundGrid size={30} fade fadeFrom="30%" fadeTo="100%" />
      <div className="rounded-xl overflow-hidden bg-theme-bg-secondary drop-shadow-lg border border-theme-border-primary transition-light-dark">
        <div className="sm:px-16  py-6 border-b border-b-theme-border-primary  transition-light-dark">
          <h2 className="text-theme-text-primary text-3xl md:text-4xl text-center text-nowrap transition-light-dark">
            Sign In
          </h2>
        </div>
        <div className="">
          <SignInForm />
        </div>
      </div>
      {error && (
        <div className=" bg-theme-error rounded-lg px-5 py-2 text-theme-bg-primary m-3 max-w-96 text-center text-pretty transition-colors">
          <p>{error?.value}</p>
        </div>
      )}
    </>
  );
}
