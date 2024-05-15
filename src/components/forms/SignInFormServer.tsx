import Github from "@/components/icons/github";
import Google from "@/components/icons/google";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { signIn } from "@/auth";

export default async function SignInForm() {
  return (
    <div className="flex flex-col gap-3 p-6">
      <form
        action={async (formData) => {
          "use server";
          return await signIn("credentials", formData);
        }}
        className="flex flex-col gap-3"
      >
        <div className="grid grid-cols-[min-content_1fr] gap-3 items-baseline">
          <label htmlFor="email">Email</label>
          <Input type="email" className="w-full" name="email" />
          <label htmlFor="password">Password</label>
          <Input type="password" className="w-full" name="password" />
        </div>
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
      <span className="w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
      <form
        action={async () => {
          "use server";
          return await signIn("google");
        }}
      >
        <Button type="submit" className="w-full">
          <span className="flex items-center gap-3 px-3 py-2 ">
            <Google className="text-2xl" />
            <span className="mx-auto text-nowrap">Sign in with Google</span>
          </span>
        </Button>
      </form>
      <form
        action={async () => {
          "use server";
          return await signIn("github");
        }}
      >
        <Button type="submit" className="w-full">
          <span className="flex items-center gap-3 px-3 py-2 ">
            <Github className="text-2xl" />
            <span className="mx-auto text-nowrap">Sign in with GitHub</span>
          </span>
        </Button>
      </form>
    </div>
  );
}
