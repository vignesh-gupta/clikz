import { MemberRole } from "@prisma/client";
import { createMiddleware } from "hono/factory";

import { db } from "../db";

export const roleMiddleware = (requiredRole: MemberRole = "MEMBER") =>
  createMiddleware(async (c, next) => {
    const user = c.get("user");

    if (!user) {
      return c.json({ error: "Unauthorized" }, 403);
    }

    const workspace =
      c.req.param("workspaceId") ||
      c.req.query("workspaceId") ||
      c.req.param("workspaceSlug") ||
      c.req.query("workspaceSlug");

    if (!workspace) {
      return c.json({ error: "Provide Workspace Id or Slug" }, 400);
    }

    const membership = await db.membership.findFirst({
      where: {
        OR: [
          {
            workspaceId: workspace,
            userId: user.id,
            role: requiredRole === "ADMIN" ? "ADMIN" : undefined,
          },
          {
            Workspace: {
              slug: workspace,
            },
            userId: user.id,
            role: requiredRole === "ADMIN" ? "ADMIN" : undefined,
          },
        ],
      },
    });

    if (!membership) {
      return c.json({ error: "Unauthorized to perform the action" }, 401);
    }

    await next();
  });
