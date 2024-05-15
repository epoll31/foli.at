import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function createUser(
  email: string,
  hash: string,
  salt: string
) {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hash,
        passwordSalt: salt,
      },
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}
