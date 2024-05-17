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
import { Accordion, AccordionContent, AccordionTrigger } from "../ui/Accordion";
import { useState } from "react";

export default function SignInForm() {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 p-6">
      <form action={signInWithCredentials} className="flex flex-col gap-3">
        <Accordion open={open}>
          <AccordionContent>
            <div className="grid grid-cols-[min-content_1fr] mb-3 gap-3 items-baseline">
              <label htmlFor="email">Email</label>
              <ErrorWrapper error={errors?.email?.message}>
                <Input
                  type="email"
                  className="w-full"
                  glowColor={errors?.email ? "#fb3b53" : "#60a5fa"}
                  {...register("email", { required: true })}
                />
              </ErrorWrapper>
              <label htmlFor="password">Password</label>
              <ErrorWrapper error={errors?.password?.message}>
                <Input
                  type="password"
                  className="w-full"
                  glowColor={errors?.password ? "#fb3b53" : "#60a5fa"}
                  {...register("password", { required: true })}
                />
              </ErrorWrapper>
            </div>
          </AccordionContent>
          <Button
            type={!open ? "submit" : "button"}
            onClick={() => {
              setOpen(!open);
            }}
            className="w-full"
            glowColor={open ? (isValid ? "#34d399" : "#fb3b53") : "#60a5fa"}
          >
            Sign in
          </Button>
        </Accordion>
      </form>
      <span className="w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
      <form action={signInWithGoogle}>
        <Button type="submit" className="w-full">
          <span className="flex items-center gap-3 px-3 py-2 ">
            <Google className="text-2xl" />
            <span className="mx-auto text-nowrap">Sign in with Google</span>
          </span>
        </Button>
      </form>
      <form action={signInWithGithub}>
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
