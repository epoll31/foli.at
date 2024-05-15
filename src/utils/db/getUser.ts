import { PrismaClient } from "@prisma/client";
import { verifyPassword } from "@/utils/password";

const prisma = new PrismaClient();

export default async function getUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && user.passwordHash && user.passwordSalt) {
      const isValid = verifyPassword(
        password,
        user.passwordHash,
        user.passwordSalt
      );
      if (isValid) {
        return user;
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
