import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { FormSchema } from "@/lib/zod/portfolioSchema";

export default async function upsertPortfolio(data: FormSchema) {
  console.log("Upserting portfolio:", data);
  const session = await auth();
  const userId = session?.user?.id;
  if (!session || !userId) {
    throw new Error("UpsertPortfolio: User is not authenticated.");
  }
  console.log("Upserting portfolio for user:", userId);

  const { portfolio, links, educationHistories, workHistories } = data;

  return prisma.$transaction(async (prisma) => {
    const userPortfolio = await prisma.portfolio.upsert({
      where: { userId: userId },
      create: {
        userId: userId,
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
