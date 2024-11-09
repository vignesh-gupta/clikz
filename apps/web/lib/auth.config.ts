import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [GitHub],
  callbacks: {
    authorized: async ({ auth }) =>  !!auth
  },
} satisfies NextAuthConfig;
