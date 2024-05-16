import { PrismaClient } from "@prisma/client";
import { Portfolio } from "@/lib/types"; // Updated import for Portfolio type
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function loadPortfolioFromSession(): Promise<Portfolio | null> {
  const session = await auth();

  const email = session?.user?.email;
  if (!email) {
    console.error("No email found in session");
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.error("No user found");
    return null;
  }

  const portfolio = await prisma.portfolio.findUnique({
    where: { userId: user.id },
    include: {
      links: true,
      educationHistories: true,
      workHistories: true,
    },
  });

  return portfolio;
}

export async function loadPortfolioFromTag(
  tag: string
): Promise<Portfolio | null> {
  const portfolio = await prisma.portfolio.findUnique({
    where: { tag },
    include: {
      links: true,
      educationHistories: true,
      workHistories: true,
    },
  });

  return portfolio;
}

export async function loadPortfolioFromUserId(
  userId: string
): Promise<Portfolio | null> {
  const portfolio = await prisma.portfolio.findUnique({
    where: { userId },
    include: {
      links: true,
      educationHistories: true,
      workHistories: true,
    },
  });

  return portfolio;
}
