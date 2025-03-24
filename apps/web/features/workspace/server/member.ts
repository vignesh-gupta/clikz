import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { roleMiddleware } from "~/lib/backend/role-middleware";
import { sessionMiddleware } from "~/lib/backend/session-middleware";
import { db } from "~/lib/db";
import { membershipSchema } from "~/lib/zod/schemas";

const workspaceMembersApp = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const idOrSlug = c.req.param("idOrSlug");

    const memberships = await db.membership.findMany({
      where: {
        OR: [{ workspaceId: idOrSlug }, { Workspace: { slug: idOrSlug } }],
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
    const idOrSlug = c.req.param("idOrSlug");

    if (!user.id) {
      return c.json(
        {
          error: "Please login/sign-up to perform the action",
        },
        401
      );
    }
    const membership = await db.membership.findFirst({
      where: {
        OR: [
          { userId: user.id, workspaceId: idOrSlug },
          { userId: user.id, Workspace: { slug: idOrSlug } },
        ],
      },
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
      const idOrSlug = c.req.param("idOrSlug");

      const membership = await db.membership.findUnique({
        where: { id: membershipId },
      });

      if (!membership) {
        return c.json(
          {
            error: "Membership not found",
          },
          404
        );
      }

      const workspace = await db.workspace.findUnique({
        where: { id: idOrSlug },
      });

      if (!workspace) {
        return c.json(
          {
            error: "Workspace not found",
          },
          404
        );
      }

      if (workspace?.ownerId === membership.userId) {
        return c.json(
          {
            error: "Cannot remove the owner of the workspace",
          },
          401
        );
      }

      const deletedMember = await db.membership.delete({
        where: {
          id: membershipId,
        },
      });

      return c.json({ success: true, member: deletedMember });
    }
  );
export default workspaceMembersApp;
