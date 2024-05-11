import Input from "@/components/ui/Input";
import { login } from "./actions";
import Button from "@/components/ui/Button";
import { AnimatePresence } from "framer-motion";

export default function SignUpPage() {
  return (
    <form className="flex flex-col w-fit">
      <div className="flex flex-col gap-1 mb-4">
        <label className="mx-2" htmlFor="email">
          Email:
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="example@email.com"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="mx-2" htmlFor="password">
          Password:
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          required
        />
      </div>
      <span className="w-full h-px from-transparent via-blue-300 to-transparent bg-gradient-to-l my-4" />
      <Button formAction={login}>Log In</Button>
    </form>
  );
}
