// src/utils/actions/setPortfolio.ts
"use server";

import prisma from "@/lib/prisma";
import { FormSchema } from "@/lib/zod/portfolioSchema";

export default async function setPortfolio(
  {
    userId: rawUserId,
    email,
  }: {
    userId?: string;
    email?: string;
  },
  data: FormSchema
) {
  console.log("userId", rawUserId);
  console.log("email", email);

  let userId;

  if (!rawUserId && !email) {
    throw new Error("No userId or email found in request");
  }

  if (!rawUserId) {
    console.log("prisma:", prisma);
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("No user found given email");
    }

    userId = user.id;
  } else {
    userId = rawUserId;
  }

  const portfolio = await prisma.portfolio.upsert({
    where: { userId: userId },
    create: {
      userId: userId,
      tag: data.portfolio.tag,
      fullName: data.portfolio.fullName,
      description: data.portfolio.description,
      title: data.portfolio.title,
      links: {
        create: data.links,
      },
      educationHistories: {
        create: data.educationHistories,
      },
      workHistories: {
        create: data.workHistories,
      },
    },
    update: {
      tag: data.portfolio.tag,
      fullName: data.portfolio.fullName,
      description: data.portfolio.description,
      title: data.portfolio.title,
      links: {
        deleteMany: {}, // Remove existing links
        create: data.links, // Add new links
      },
      educationHistories: {
        deleteMany: {}, // Remove existing education histories
        create: data.educationHistories, // Add new education histories
      },
      workHistories: {
        deleteMany: {}, // Remove existing work histories
        create: data.workHistories, // Add new work histories
      },
    },
    include: {
      links: true,
      educationHistories: true,
      workHistories: true,
    },
  });

  return portfolio;
}
