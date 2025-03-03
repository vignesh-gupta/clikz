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
      where: {
        OR: [
          { id: c.req.param("idOrSlug") },
          { slug: c.req.param("idOrSlug") },
        ],
      },
    });

    return c.json(workspace);
  })
  .delete("/", sessionMiddleware, roleMiddleware("ADMIN"), async (c) => {
    const workspace = c.req.param("idOrSlug");

    await db.workspace.deleteMany({
      where: {
        OR: [
          { id: c.req.param("idOrSlug") },
          { slug: c.req.param("idOrSlug") },
        ],
      },
    });

    return c.json({ success: true, workspace });
  })
  .patch(
    "/",
    sessionMiddleware,
    roleMiddleware("ADMIN"),
    zValidator("json", workspaceSchema.partial()),
    async (c) => {
      const idOrSlug = c.req.param("idOrSlug");
      const { name, slug, icon } = c.req.valid("json");

      const existingWorkspace = await db.workspace.findFirst({
        where: {
          OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        },
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
      const idOrSlug = c.req.param("idOrSlug");

      const workspace = await db.workspace.findFirst({
        where: {
          OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        },
      });

      if (!workspace) {
        return c.json({ error: "Workspace not found" }, 404);
      }

      const defaultInvite = generateCUID();

      const updatedWorkspace = await db.workspace.updateMany({
        where: {
          OR: [
            { id: c.req.param("idOrSlug") },
            { slug: c.req.param("idOrSlug") },
          ],
        },
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
