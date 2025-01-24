import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { roleMiddleware } from "~/lib/backend/role-middleware";
import { sessionMiddleware } from "~/lib/backend/session-middleware";
import { db } from "~/lib/db";
import { membershipSchema } from "~/lib/zod-schemas";

const workspaceMembersApp = new Hono()
  .get("/", sessionMiddleware, async (c) => {
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
  })
  .patch(
    "/:membershipId",
    sessionMiddleware,
    roleMiddleware("ADMIN"),
    zValidator("json", membershipSchema.partial()),
    async (c) => {
      const membershipId = c.req.param("membershipId");
      const { role } = c.req.valid("json");

      const updatedMember = await db.membership.update({
        where: {
          id: membershipId,
        },
        data: {
          role,
        },
      });

      return c.json({ success: true, member: updatedMember });
    }
  )
  .delete("/leave", sessionMiddleware, roleMiddleware(), async (c) => {
    const user = c.get("user");
    const workspaceId = c.req.param("workspaceId");

    if (!user.id) {
      return c.json(
        {
          error: "Please login/sign-up to perform the action",
        },
        401
      );
    }

    const membership = await db.membership.findFirst({
      where: { userId: user.id, workspaceId },
    });

    if (!membership) {
      return c.json(
        {
          error: "You are not a member of the workspace",
        },
        401
      );
    }

    const deletedMember = await db.membership.delete({
      where: {
        id: membership.id,
      },
    });

    return c.json({ success: true, member: deletedMember });
  })
  .delete(
    "/:membershipId",
    sessionMiddleware,
    roleMiddleware("ADMIN"),
    async (c) => {
      const membershipId = c.req.param("membershipId");

      const deletedMember = await db.membership.delete({
        where: {
          id: membershipId,
        },
      });

      return c.json({ success: true, member: deletedMember });
    }
  );
export default workspaceMembersApp;
