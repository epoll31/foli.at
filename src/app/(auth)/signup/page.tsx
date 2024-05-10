import Input from "@/components/form/input";
import { signup } from "./actions";

export default function SignUpPage() {
  return (
    <form className="flex flex-col w-fit">
      <label htmlFor="email">Email:</label>
      <Input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <Input id="password" name="password" type="password" required />
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
