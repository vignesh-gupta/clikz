import { compare } from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";

import { getUserByEmail, getUserById } from "~/features/auth/data";

import { db } from "./lib/db";
import { signInSchema } from "./lib/zod/schemas";

export default {
  providers: [
    GitHub,
    Discord,
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials);

        const user = await getUserByEmail(email);
        if (!user || !user.password) throw null;

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) return null;

        return {
          ...user,
          password: undefined,
        };
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
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        token.user = user;
      }

      // refresh the user's data if they update their name / email
      if (trigger === "update") {
        const refreshedUser = await db.user.findUnique({
          where: { id: token.sub },
        });
        if (refreshedUser) {
          token.user = refreshedUser;
        } else {
          return {};
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.sub,
        // @ts-ignore
        ...(token || session).user,
      };
      return session;
    },
  },
} satisfies NextAuthConfig;
