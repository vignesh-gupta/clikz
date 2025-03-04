import { MemberRole, Membership } from "@prisma/client";
import { createMiddleware } from "hono/factory";

import { db } from "../db";
import { UserAdditionalContext } from "./session-middleware";

type RoleAdditionalContext = UserAdditionalContext & {
  Variables: {
    membership: Membership;
  };
};

export const roleMiddleware = (requiredRole: MemberRole = "MEMBER") =>
  createMiddleware<RoleAdditionalContext>(async (c, next) => {
    const user = c.get("user");

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const workspace =
      c.req.param("workspaceId") ||
      c.req.query("workspaceId") ||
      c.req.param("workspaceSlug") ||
      c.req.query("workspaceSlug") ||
      c.req.param("idOrSlug") ||
      c.req.query("idOrSlug");

    if (!workspace) {
      return c.json(
        { code: "unauthorized", error: "Provide Workspace Id or Slug" },
        400
      );
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
      return c.json(
        { code: "forbidden", error: "The actions is forbidden" },
        403
      );
    }

    c.set("membership", membership);

    await next();
  });
