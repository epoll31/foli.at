import prisma from "@/lib/prisma";
import { FormSchema } from "@/lib/zod/portfolioSchema";
import { Session } from "next-auth";

export default async function upsertPortfolio(
  data: FormSchema,
  session: Session
) {
  console.log("Upserting portfolio:", data);

  const email = session.user?.email;
  if (!session || !email) {
    throw new Error("UpsertPortfolio: User is not authenticated.");
  }
  console.log("Upserting portfolio for user:", email);

  const { portfolio, links, educationHistories, workHistories } = data;

  return prisma.$transaction(async (prisma) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    const userPortfolio = await prisma.portfolio.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        tag: portfolio.tag,
        fullName: portfolio.fullName,
        description: portfolio.description,
        title: portfolio.title,
        links: {
          create: links,
        },
        educationHistories: {
          create: educationHistories,
        },
        workHistories: {
          create: workHistories,
        },
      },
      update: {
        tag: portfolio.tag,
        fullName: portfolio.fullName,
        description: portfolio.description,
        title: portfolio.title,
        links: {
          deleteMany: {}, // Remove existing links
          create: links, // Add new links
        },
        educationHistories: {
          deleteMany: {}, // Remove existing education histories
          create: educationHistories, // Add new education histories
        },
        workHistories: {
          deleteMany: {}, // Remove existing work histories
          create: workHistories, // Add new work histories
        },
      },
      include: {
        links: true,
        educationHistories: true,
        workHistories: true,
      },
    });

    return userPortfolio;
  });
}
