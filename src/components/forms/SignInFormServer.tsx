import Github from "@/components/icons/github";
import Google from "@/components/icons/google";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { signIn } from "@/auth";

export default async function SignInForm() {
  return (
    <div className="flex flex-col gap-3">
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
      <form
        action={async () => {
          "use server";
          return await signIn("google");
        }}
      >
        <button
          type="submit"
          className="border-2 border-blue-200 bg-transparent hover:bg-blue-200 active:bg-blue-300 rounded-lg px-3 py-2 text-xl w-full flex items-center gap-3 transition-colors duration-500"
        >
          <Google className="text-2xl" />
          <span className="mx-auto text-nowrap">Sign in with Google</span>
        </button>
      </form>
      <form
        action={async () => {
          "use server";
          return await signIn("github");
        }}
      >
        <button
          type="submit"
          className="border-2 border-blue-200 bg-transparent hover:bg-blue-200 active:bg-blue-300 rounded-lg px-3 py-2 w-full  text-xl flex items-center gap-3 transition-colors duration-500"
        >
          <Github className="text-2xl" />
          <span className="mx-auto text-nowrap">Sign in with GitHub</span>
        </button>
      </form>
    </div>
  );
}
