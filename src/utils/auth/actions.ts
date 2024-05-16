import { signIn } from "next-auth/react";

export async function signInWithCredentials(formData: FormData) {
  await signIn("credentials", {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    callbackUrl: "/",
  });
}

export async function signInWithGoogle() {
  await signIn("google", {
    callbackUrl: "/",
  });
}

export async function signInWithGithub() {
  await signIn("github", {
    callbackUrl: "/",
  });
}
