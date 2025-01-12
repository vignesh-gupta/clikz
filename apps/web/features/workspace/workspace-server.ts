import { MemberRole } from "@prisma/client";
import { Hono } from "hono";

import { db } from "~/lib/db";
import { sessionMiddleware } from "~/lib/session-middleware";

const workspaceApp = new Hono()
  .delete("/", sessionMiddleware, async (c) => {
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
  })
  .get("/members", sessionMiddleware, async (c) => {
    const workspaceId = c.req.param("workspaceId");

    const memberships = await db.membership.findMany({
      where: {
        workspaceId,
      },
      include: {
        User: {
          select: {
            email: true,
            name: true,
            image: true,
          },
        },
      },
    });

    const members = memberships.map((m) => ({
      id: m.id,
      name: m.User.name,
      email: m.User.email,
      image: m.User.image,
      role: m.role,
    }));

    return c.json(members);
  });

export default workspaceApp;
