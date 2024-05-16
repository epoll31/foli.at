import prisma from "@/lib/prisma";

export default async function getPortfolio({
  userId,
  email,
  tag,
}: {
  userId?: string;
  email?: string;
  tag?: string;
}) {
  let where;

  if (tag) {
    where = { tag };
  } else {
    if (!userId && !email) {
      throw new Error("No userId or email found in request");
    }

    if (!userId) {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("No user found given email");
      }

      userId = user.id;
    }

    where = { userId };
  }

  const portfolio = await prisma.portfolio.findUnique({
    where,
    include: {
      links: true,
      educationHistories: true,
      workHistories: true,
    },
  });

  if (!portfolio) {
    throw new Error("No portfolio found");
  }

  return portfolio;
}
