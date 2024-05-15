"use client";
import Github from "@/components/icons/github";
import Google from "@/components/icons/google";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { SignInSchema, signInSchema } from "@/lib/zod/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorWrapper from "./ErrorWrapper";
import {
  signInWithCredentials,
  signInWithGithub,
  signInWithGoogle,
} from "@/utils/auth/actions";

export default function SignInForm() {
  const {
    register,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  return (
    <div className="flex flex-col gap-3">
      <form action={signInWithCredentials} className="flex flex-col gap-3">
        <div className="grid grid-cols-[min-content_1fr] gap-3 items-baseline">
          <label htmlFor="email">Email</label>
          <ErrorWrapper error={errors?.email?.message}>
            <Input
              type="email"
              className="w-full"
              {...register("email", { required: true })}
            />
          </ErrorWrapper>
          <label htmlFor="password">Password</label>
          <ErrorWrapper error={errors?.password?.message}>
            <Input
              type="password"
              className="w-full"
              {...register("password", { required: true })}
            />
          </ErrorWrapper>
        </div>
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
      <form action={signInWithGoogle}>
        <button
          type="submit"
          className="border-2 border-blue-200 bg-transparent hover:bg-blue-200 active:bg-blue-300 rounded-lg px-3 py-2 text-xl w-full flex items-center gap-3 transition-colors duration-500"
        >
          <Google className="text-2xl" />
          <span className="mx-auto text-nowrap">Sign in with Google</span>
        </button>
      </form>
      <form action={signInWithGithub}>
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
