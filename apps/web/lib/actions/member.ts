"use server";

import { MemberRole } from "@prisma/client";

import {
  generateInviteCode,
  getWorkspaceIconURL,
} from "@clikz/utils/functions";

import { db } from "../db";
import { sendWorkspaceInvite } from "../email";
import { getUser } from "./utils";

export const inviteUser = async (emails: string[], workspaceSlug: string) => {
  try {
    const user = await getUser();

    const workspace = await db.workspace.findUnique({
      where: {
        slug: workspaceSlug,
      },
    });

    if (!workspace) {
      return { error: "Workspace not found" };
    }

    const membership = await db.membership.findFirst({
      where: {
        userId: user.id,
        workspaceId: workspace.id,
      },
    });

    if (
      !membership ||
      membership.role !== "ADMIN" ||
      membership.userId !== user.id
    ) {
      return { error: "You are not the owner of this workspace" };
    }

    await db.invite.deleteMany({
      where: {
        email: {
          in: emails,
        },
      },
    });

    const invites = await Promise.all(
      emails.map((email) =>
        db.invite.create({
          data: {
            email,
            workspaceId: workspace.id,
            token: generateInviteCode(),
            // Expires in 15 days
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            role: MemberRole.MEMBER,
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
    return { success: "Invites sent successfully" };
  } catch (error) {
    return { error: "Failed to invite user" };
  }
};
