import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { ZodError } from "zod";
import { signInSchema } from "@/lib/zod/signInSchema";
import { hashPassword } from "@/utils/password";
import getUser from "@/utils/db/getUser";
import createUser from "@/utils/db/createUser";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );
          // logic to verify if user exists
          user = await getUser(email, password);

          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            // logic to salt and hash password
            const { hash, salt } = hashPassword(password);

            user = await createUser(email, hash, salt);
          }

          // return user object with the their profile data
          return user;
        } catch (error) {
          console.error("Error authorizing user:", error);
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/",
    signIn: "/",
    signOut: "/",
    newUser: "/portfolio",
  },
});
