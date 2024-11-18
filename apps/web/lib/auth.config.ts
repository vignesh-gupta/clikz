import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { prisma } from "./prisma";
import { signInSchema } from "./zod-schemas";

export default {
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("credentials", credentials);

        const { email, password } = await signInSchema.parseAsync(credentials);

        console.log("email", email);

        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (!user || user.password !== password) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => !!auth,
  },
} satisfies NextAuthConfig;
