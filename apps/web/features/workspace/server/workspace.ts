import { Hono } from "hono";

import { roleMiddleware } from "~/lib/backend/role-middleware";
import { sessionMiddleware } from "~/lib/backend/session-middleware";
import { db } from "~/lib/db";

import workspaceInviteApp from "./invite";
import workspaceMembersApp from "./member";

const workspaceApp = new Hono()

  .route("/members", workspaceMembersApp)
  .route("/invites", workspaceInviteApp)
  .delete("/", sessionMiddleware, roleMiddleware("ADMIN"), async (c) => {
    const workspaceId = c.req.param("workspaceId");

    await db.workspace.delete({
      where: { id: workspaceId },
    });

    return c.json({ success: true, workspaceId });
  });

export default workspaceApp;
