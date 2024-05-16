// src/actions/getUserById.ts

import prisma from "@/lib/prisma";

export default async function getUserByEmail(email: string) {
  if (!email) {
    throw new Error("No email found in request");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("No user found");
  }

  return user;
}
