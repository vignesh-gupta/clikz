import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { sessionMiddleware } from "~/lib/backend/session-middleware";
import { db } from "~/lib/db";
import { userAccountSchema } from "~/lib/zod/schemas";

const authApp = new Hono()
  .patch(
    "/:userId",
    sessionMiddleware,
    zValidator("json", userAccountSchema.partial()),
    async (c) => {
      const user = c.get("user");
      const data = c.req.valid("json");
      const userId = c.req.param("userId");

      if (user.id !== userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const updatedUser = await db.user.update({
        where: { id: user.id },
        data,
      });

      return c.json(updatedUser);
    }
  )
  .delete("/:userId", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const userId = c.req.param("userId");

    if (user.id !== userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Setup a logic to send a email to user for confirmation of deletion
    // Once user confirms, delete the user account after 30 day of no activity

    return c.json({ message: "Requested Deletion!" });
  });

export default authApp;
