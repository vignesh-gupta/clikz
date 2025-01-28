import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { generateCUID } from "@clikz/ui/lib/utils";

import { roleMiddleware } from "~/lib/backend/role-middleware";
import { sessionMiddleware } from "~/lib/backend/session-middleware";
import { DATA_PREFIX } from "~/lib/constants";
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
  .patch(
    "/",
    sessionMiddleware,
    roleMiddleware("ADMIN"),
    zValidator("json", workspaceSchema.partial()),
    async (c) => {
      const workspaceId = c.req.param("workspaceId");
      const { name, slug, icon } = c.req.valid("json");

      const existingWorkspace = await db.workspace.findFirst({
        where: { id: workspaceId },
      });

      if (!existingWorkspace) {
        return c.json({ error: "Workspace not found" }, 404);
      }

      const workspace = await db.workspace.update({
        where: { id: existingWorkspace.id },
        data: {
          name: name ?? existingWorkspace.name,
          slug: slug ?? existingWorkspace.slug,
          icon: icon ?? existingWorkspace.icon,
        },
      });

      return c.json(workspace);
    }
  )
  .post(
    "/reset-invite",
    sessionMiddleware,
    roleMiddleware("ADMIN"),
    async (c) => {
      const workspaceId = c.req.param("workspaceId");

      const workspace = await db.workspace.findFirst({
        where: { id: workspaceId },
      });

      if (!workspace) {
        return c.json({ error: "Workspace not found" }, 404);
      }

      const defaultInvite = generateCUID();

      const updatedWorkspace = await db.workspace.update({
        where: { id: workspaceId },
        data: {
          defaultInvite,
        },
      });

      return c.json({
        workspace: updatedWorkspace,
        code: `${DATA_PREFIX.WORKSPACE_INVITE}${defaultInvite}`,
      });
    }
  );

export default workspaceApp;
