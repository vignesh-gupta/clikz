import { MemberRole } from "@prisma/client";
import { Hono } from "hono";

import { db } from "~/lib/db";
import { sessionMiddleware } from "~/lib/session-middleware";

const workspaceApp = new Hono().delete("/", sessionMiddleware, async (c) => {
  const workspaceId = c.req.param("workspaceId");
  const user = c.get("user");

  const membership = await db.membership.findFirst({
    where: {
      userId: user.id,
      workspaceId,
      role: MemberRole.ADMIN,
    },
  });

  if (!membership) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  await db.workspace.delete({
    where: { id: workspaceId },
  });

  return c.json({ success: true });
});

export default workspaceApp;
