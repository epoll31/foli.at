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
import Hr from "@/components/ui/Hr";

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
  //TODO: fix tabindex on accordion closed things
  return (
    <div className="flex flex-col gap-3 p-6">
      <form action={signInWithCredentials} className="flex flex-col gap-3">
        <Accordion open={open}>
          <AccordionContent>
            <div className="grid grid-cols-[min-content_1fr] mb-3 gap-3 items-baseline text-theme-text-primary">
              <label htmlFor="email">Email</label>
              <ErrorWrapper error={errors?.email?.message}>
                <Input
                  type="email"
                  className="w-full"
                  glowColor={
                    errors?.email ? "var(--theme-error)" : "var(--theme-info)"
                  }
                  {...register("email", { required: true })}
                />
              </ErrorWrapper>
              <label htmlFor="password">Password</label>
              <ErrorWrapper error={errors?.password?.message}>
                <Input
                  type="password"
                  className="w-full"
                  glowColor={
                    errors?.password
                      ? "var(--theme-error)"
                      : "var(--theme-info)"
                  }
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
            glowColor={
              open
                ? isValid
                  ? "var(--theme-success)"
                  : "var(--theme-error)"
                : "var(--theme-info)"
            }
          >
            <span className="inline-flex py-2">Sign in with Email</span>
          </Button>
        </Accordion>
      </form>
      <Hr />
      <form action={signInWithGoogle}>
        <Button type="submit" className="w-full">
          <span className="flex items-center gap-3 px-3 py-2 ">
            <Google className="text-2xl" />
            <span className="mx-auto text-nowrap text-theme-text-primary">
              Sign in with Google
            </span>
          </span>
        </Button>
      </form>
      <form action={signInWithGithub}>
        <Button type="submit" className="w-full">
          <span className="flex items-center gap-3 px-3 py-2 ">
            <Github className="text-2xl" />
            <span className="mx-auto text-nowrap text-theme-text-primary">
              Sign in with GitHub
            </span>
          </span>
        </Button>
      </form>
    </div>
  );
}
