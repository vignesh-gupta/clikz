import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { getUserByEmail, getUserById } from "~/data/user";
import { signInSchema } from "./lib/zod-schemas";
import { compare } from "bcryptjs";

export default {
  providers: [
    GitHub,
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials);

        const user = await getUserByEmail(email);
        if (!user || !user.password) throw null;

        const isPasswordValid = await compare(password, user.password);

        console.log({
          isPasswordValid,
          password,
          user,
        });

        if (!isPasswordValid) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    signIn: async ({ account, user }) => {
      if (account?.provider !== "credentials") return true;

      // Prevent sign in if email is not verified
      const existingUser = await getUserById(user.id as string);
      if (!existingUser || !existingUser.emailVerified) return false;

      return true;
    },
  },
} satisfies NextAuthConfig;
