import { Hono } from "hono";

import { sessionMiddleware } from "~/lib/backend/session-middleware";
import { db } from "~/lib/db";

const workspaceMembersApp = new Hono().get(
  "/",
  sessionMiddleware,
  async (c) => {
    const workspaceId = c.req.param("workspaceId");

    const memberships = await db.membership.findMany({
      where: {
        workspaceId,
      },
      include: {
        User: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    const members = memberships.map((m) => ({
      id: m.id,
      name: m.User.name,
      email: m.email,
      image: m.User.image,
      role: m.role,
    }));

    return c.json(members);
  }
);

export default workspaceMembersApp;
