import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import authConfig from "~/auth.config";
import { db } from "~/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },

  events: {
    linkAccount: async ({ user }) => {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  ...authConfig,
});
