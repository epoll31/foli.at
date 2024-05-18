import BackgroundGrid from "@/components/BackgroundGrid";
import SignInForm from "@/components/forms/SignInForm";

export default function SignInPage() {
  return (
    <>
      <BackgroundGrid size={30} fade fadeFrom="30%" fadeTo="100%" />
      <div className="rounded-xl overflow-hidden bg-theme-bg-secondary drop-shadow-lg border border-theme-border-primary">
        <div className="sm:px-16  py-6 border-b border-b-theme-border-primary">
          <h2 className="text-theme-text-primary text-3xl md:text-4xl text-center text-nowrap">
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
