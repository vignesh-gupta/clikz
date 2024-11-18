import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { prisma } from "./prisma";
import { signInSchema } from "./zod-schemas";
import { comparePassword } from "./utils";

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

        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });
        if (!user) throw new Error("User not found");

        const isPasswordValid = await comparePassword(password, user.password);

        console.log({
          isPasswordValid,
          password,
          user,
        });

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
