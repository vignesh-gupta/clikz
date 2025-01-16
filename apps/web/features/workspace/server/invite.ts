import { Hono } from "hono";

import { db } from "~/lib/db";
import { sessionMiddleware } from "~/lib/session-middleware";

const workspaceInviteApp = new Hono().get("/", sessionMiddleware, async (c) => {
  const workspaceId = c.req.param("workspaceId");

  const invites = await db.invite.findMany({
    where: {
      workspaceId,
    },
  });

  return c.json(invites);
});

export default workspaceInviteApp;
