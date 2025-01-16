import { Hono } from "hono";

import { sessionMiddleware } from "~/lib/backend/session-middleware";
import { db } from "~/lib/db";

import workspaceApp from "./workspace";

const workspacesApp = new Hono()
  .route("/:workspaceId", workspaceApp)
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
  })
  .get("/:slug/exist", async (c) => {
    const slug = c.req.param("slug");

    const workspaceCount = await db.workspace.count({
      where: {
        slug,
      },
    });

    return c.json({ exists: workspaceCount > 0 });
  });

export default workspacesApp;
