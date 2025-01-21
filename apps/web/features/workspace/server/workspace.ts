import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { roleMiddleware } from "~/lib/backend/role-middleware";
import { sessionMiddleware } from "~/lib/backend/session-middleware";
import { db } from "~/lib/db";
import { workspaceSchema } from "~/lib/zod-schemas";

import workspaceInviteApp from "./invite";
import workspaceMembersApp from "./member";

const workspaceApp = new Hono()

  .route("/members", workspaceMembersApp)
  .route("/invites", workspaceInviteApp)
  .get("/", sessionMiddleware, roleMiddleware(), async (c) => {
    const workspace = await db.workspace.findFirst({
      where: { id: c.req.param("workspaceId") },
    });

    return c.json(workspace);
  })
  .delete("/", sessionMiddleware, roleMiddleware("ADMIN"), async (c) => {
    const workspaceId = c.req.param("workspaceId");

    await db.workspace.delete({
      where: { id: workspaceId },
    });

    return c.json({ success: true, workspaceId });
  })
  .put(
    "/",
    sessionMiddleware,
    roleMiddleware("ADMIN"),
    zValidator("json", workspaceSchema),
    async (c) => {
      const workspaceId = c.req.param("workspaceId");
      const { name, slug } = c.req.valid("json");

      const workspace = await db.workspace.update({
        where: { id: workspaceId },
        data: { name, slug },
      });

      return c.json(workspace);
    }
  );

export default workspaceApp;
