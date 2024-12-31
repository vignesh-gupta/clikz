import { createMiddleware } from "hono/factory";
import { User } from "next-auth";

import { auth } from "~/auth";

type AdditionalContext = {
  Variables: {
    user: User;
  };
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return c.json({ error: "Unauthorized" }, { status: 401 });
    }

    c.set("user", session.user);

    await next();
  }
);
