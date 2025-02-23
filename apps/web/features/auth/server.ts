import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { sessionMiddleware } from "~/lib/backend/session-middleware";
import { db } from "~/lib/db";
import { userAccountSchema } from "~/lib/zod-schemas";

const authApp = new Hono().patch(
  "/:userId",
  sessionMiddleware,
  zValidator("json", userAccountSchema),
  async (c) => {
    const user = c.get("user");
    const data = c.req.valid("json");

    if (user.email !== data.email) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data,
    });

    return c.json(updatedUser);
  }
);

export default authApp;
