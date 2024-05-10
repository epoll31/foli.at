import Input from "@/components/form/input";
import { login } from "./actions";

export default function LoginPage() {
  return (
    <form className="flex flex-col w-fit">
      <label htmlFor="email">Email:</label>
      <Input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <Input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
    </form>
  );
}
