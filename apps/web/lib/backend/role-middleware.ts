import { MemberRole } from "@prisma/client";
import { createMiddleware } from "hono/factory";

import { db } from "../db";

export const roleMiddleware = (requiredRole: MemberRole) =>
  createMiddleware(async (c, next) => {
    const user = c.get("user");

    if (!user) {
      return c.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workspaceId = c.req.param("workspaceId");

    if (!workspaceId) {
      return c.json({ error: "Missing workspaceId" }, { status: 400 });
    }

    const membership = await db.membership.findFirst({
      where: {
        workspaceId,
        userId: user.id,
        role: requiredRole === "ADMIN" ? "ADMIN" : undefined,
      },
    });

    console.log("membership", membership);

    if (!membership) {
      return c.json({ error: "Unauthorized" }, { status: 401 });
    }

    await next();
  });
