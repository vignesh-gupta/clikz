import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import {
  ClikzApiError,
  handleAndReturnAPIErrorResponse,
} from "~/lib/backend/error";
import { sessionMiddleware } from "~/lib/backend/session-middleware";
import { db } from "~/lib/db";
import { inviteActionSchema } from "~/lib/zod/schemas";

export const inviteActionApp = new Hono().post(
  "/",
  sessionMiddleware,
  zValidator("json", inviteActionSchema),
  async (c) => {
    try {
      const { action, token } = c.req.valid("json");
      const currentUser = c.get("user");

      if (!currentUser || !currentUser.email) {
        throw new ClikzApiError({
          code: "unauthorized",
          message: "User is not logged in",
        });
      }

      const user = await db.user.findFirstOrThrow({
        where: {
          email: currentUser.email,
        },
      });

      const invitation = await db.invite.findFirstOrThrow({
        where: {
          token,
          email: user.email,
          expires: {
            gte: new Date(),
          },
        },
        include: {
          Workspace: {
            select: {
              slug: true,
              name: true,
            },
          },
        },
      });

      if (action === "accept") {
        await Promise.allSettled([
          db.membership.create({
            data: {
              userId: user.id,
              workspaceId: invitation.workspaceId,
              role: invitation.role,
              email: user.email,
            },
          }),
          db.invite.deleteMany({
            where: {
              id: invitation.id,
            },
          }),
        ]);

        if (!user.defaultWorkspace) {
          await db.user.update({
            where: {
              id: user.id,
            },
            data: {
              defaultWorkspace: invitation.Workspace.slug,
            },
          });
        }
      } else if (action === "decline") {
        await db.invite.deleteMany({
          where: {
            id: invitation.id,
          },
        });
      }

      return c.json({
        success: true,
        action,
        workspaceSlug: invitation.Workspace.slug,
        workspaceName: invitation.Workspace.name,
      });
    } catch (error) {
      const { headers, json, status } = handleAndReturnAPIErrorResponse(error);

      return c.json(json, status, headers);
    }
  }
);
