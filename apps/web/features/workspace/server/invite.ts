import { Hono } from "hono";

import { roleMiddleware } from "~/lib/backend/role-middleware";
import { sessionMiddleware } from "~/lib/backend/session-middleware";
import { db } from "~/lib/db";
import { sendWorkspaceInvite } from "~/lib/email";

const workspaceInviteApp = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const workspaceId = c.req.param("workspaceId");

    const invites = await db.invite.findMany({
      where: {
        workspaceId,
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
    "/resend/:inviteId",
    sessionMiddleware,
    roleMiddleware("ADMIN"),
    async (c) => {
      const inviteId = c.req.param("inviteId");

      const invite = await db.invite.findUnique({
        where: {
          id: inviteId,
        },
      });

      if (!invite) {
        return c.json({ error: "Invite not found" }, 404);
      }

      if (invite.expires < new Date()) {
        return c.json({ error: "Invite has expired" }, 400);
      }

      const res = await sendWorkspaceInvite(invite.email, invite.token);

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
