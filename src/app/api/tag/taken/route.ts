import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();

  const email = session?.user?.email ?? undefined;
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  const NOT = user ? { userId: user.id } : undefined;

  try {
    const { tag } = await req.json();
    const portfolio = await prisma.portfolio.findFirst({
      where: {
        tag,
        NOT,
      },
    });

    return new Response(JSON.stringify({ tagTaken: !!portfolio }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching tag:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch tag" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
