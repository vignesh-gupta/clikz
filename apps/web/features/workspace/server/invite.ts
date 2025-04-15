import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { sendWorkspaceInvite } from "@clikz/emails";
import {
  generateInviteCode,
  getWorkspaceIconURL,
} from "@clikz/utils/functions";

import { roleMiddleware } from "~/lib/backend/role-middleware";
import { sessionMiddleware } from "~/lib/backend/session-middleware";
import { db } from "~/lib/db";
import { inviteSchema } from "~/lib/zod/schemas";

const workspaceInviteApp = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const idOrSlug = c.req.param("idOrSlug");

    const invites = await db.invite.findMany({
      where: {
        OR: [
          {
            workspaceId: idOrSlug,
          },
          {
            Workspace: {
              slug: idOrSlug,
            },
          },
        ],
      },
    });

    return c.json(invites);
  })
  .get("/:inviteId", sessionMiddleware, async (c) => {
    const inviteId = c.req.param("inviteId");

    const invite = await db.invite.findUnique({
      where: {
        id: inviteId,
      },
    });

    return c.json(invite);
  })
  .post(
    "/bulk-invite",
    sessionMiddleware,
    roleMiddleware("ADMIN"),
    zValidator("json", inviteSchema),
    async (c) => {
      const idOrSlug = c.req.param("idOrSlug");
      const { emails } = c.req.valid("json");

      if (!idOrSlug || !emails) {
        return c.json({ error: "Invalid request" }, 400);
      }

      const workspace = await db.workspace.findFirst({
        where: {
          OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        },
      });

      if (!workspace) return c.json({ error: "Workspace not found" }, 404);

      const invites = await Promise.all(
        emails.map((email) =>
          db.invite.create({
            data: {
              email,
              workspaceId: workspace.id,
              role: "MEMBER",
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 14 days
              token: generateInviteCode(),
            },
          })
        )
      );

      await Promise.all(
        invites.map((invite) =>
          sendWorkspaceInvite(
            invite.email,
            invite.token,
            getWorkspaceIconURL(workspace.slug, workspace.icon)
          )
        )
      );

      return c.json({ success: true, emails });
    }
  )
  .post(
    "/resend/:inviteId",
    sessionMiddleware,
    roleMiddleware("ADMIN"),
    async (c) => {
      const inviteId = c.req.param("inviteId");

      const invite = await db.invite.findUnique({
        where: {
          id: inviteId,
        },
        include: {
          Workspace: {
            select: {
              slug: true,
              icon: true,
            },
          },
        },
      });

      if (!invite) {
        return c.json({ error: "Invite not found" }, 404);
      }

      if (invite.expires < new Date()) {
        return c.json({ error: "Invite has expired" }, 400);
      }

      const res = await sendWorkspaceInvite(
        invite.email,
        invite.token,
        getWorkspaceIconURL(invite.Workspace.slug, invite.Workspace.icon)
      );

      if (res.error) {
        return c.json(
          {
            error: "Unable to send email, please use workspace general invite",
          },
          500
        );
      }

      return c.json({ success: true, user: invite.email, inviteId });
    }
  )
  .delete(
    "/:inviteId",
    sessionMiddleware,
    roleMiddleware("ADMIN"),
    async (c) => {
      const inviteId = c.req.param("inviteId");
      await db.invite.deleteMany({
        where: {
          id: inviteId,
        },
      });

      return c.json({ success: true, inviteId });
    }
  );

export default workspaceInviteApp;
