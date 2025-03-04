import { createMiddleware } from "hono/factory";
import { User } from "next-auth";

import { auth } from "~/auth";

export type UserAdditionalContext = {
  Variables: {
    user: User;
  };
};

export const sessionMiddleware = createMiddleware<UserAdditionalContext>(
  async (c, next) => {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return c.json({ error: "Unauthenticated" }, 401);
    }

    c.set("user", session.user);

    await next();
  }
);
