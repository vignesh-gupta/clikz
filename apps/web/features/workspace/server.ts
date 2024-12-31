import { Hono } from "hono";

import { db } from "~/lib/db";
import { sessionMiddleware } from "~/lib/session-middleware";

const workspacesApp = new Hono()
  .get("/:slug/exist", async (c) => {
    const slug = c.req.param("slug");

    const workspace = await db.workspace.count({
      where: {
        slug,
      },
    });

    return c.json({ exists: workspace > 0 });
  })
  .get("/", sessionMiddleware, async (c) => {
    const user = c.get("user");

    const membership = await db.membership.findMany({
      where: {
        userId: user.id,
      },
    });

    const workspace = await db.workspace.findMany({
      where: {
        id: {
          in: membership.map((m) => m.workspaceId),
        },
      },
    });

    return c.json(workspace);
  });

export default workspacesApp;
