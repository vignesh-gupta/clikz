import { Hono } from "hono";

import { sessionMiddleware } from "~/lib/backend/session-middleware";
import { db } from "~/lib/db";

const workspaceInviteApp = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const workspaceId = c.req.param("workspaceId");

    const invites = await db.invite.findMany({
      where: {
        workspaceId,
      },
    });

    return c.json(invites);
  })
  .get("/:inviteId", sessionMiddleware, async (c) => {
    const inviteId = c.req.param("inviteId");

    const invite = await db.invite.findUnique({
      where: {
        id: inviteId,
      },
    });

    return c.json(invite);
  })
  .delete("/:inviteId", sessionMiddleware, async (c) => {
    const inviteId = c.req.param("inviteId");
    await db.invite.deleteMany({
      where: {
        id: inviteId,
      },
    });

    return c.json({ success: true, inviteId });
  });

export default workspaceInviteApp;
