"use server";

import { auth } from "~/auth";
import { generateInviteCode } from "~/lib/utils/generate";

import { db } from "../db";
import { sendWorkspaceInvite } from "../email";
import { WorkspaceSchema } from "../zod-schemas";

export const createWorkspace = async (data: WorkspaceSchema) => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return { error: "You must be signed in to create a workspace" };
  }

  await db.workspace.create({
    data: {
      name: data.name,
      slug: data.slug,
      userId: session.user.id,
    },
  });

  return { success: "Workspace create successfully" };
};

export const inviteUser = async (emails: string[], workspaceSlug: string) => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return { error: "You must be signed in to invite a user" };
  }

  const workspace = await db.workspace.findUnique({
    where: {
      slug: workspaceSlug,
    },
  });

  if (!workspace) {
    return { error: "Workspace not found" };
  }

  if (workspace.userId !== session.user.id) {
    return { error: "You are not the owner of this workspace" };
  }

  try {
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
          },
        })
      )
    );

    await Promise.all(
      invites.map((invite) => sendWorkspaceInvite(invite.email, invite.token))
    );
    return { success: "Invites sent successfully" };
  } catch (error) {
    return { error: "Failed to invite user" };
  }
};
