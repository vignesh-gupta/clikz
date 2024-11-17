import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { saltAndHash } from "./utils";
import { signInSchema } from "./zod-schemas";
import { prisma } from "./prisma";

export default {
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials);

        const hashedPassword = await saltAndHash(password);

        const user = await prisma.user.findFirst({
          where: {
            email,
            password: hashedPassword,
          },
        });

        if (!user) {
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
