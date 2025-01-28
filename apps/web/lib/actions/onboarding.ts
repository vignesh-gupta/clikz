"use server";

import { MemberRole } from "@prisma/client";

import { auth } from "~/auth";
import { generateInviteCode, generateRandomSlug } from "~/lib/utils/generate";
import { LinkSchema } from "~/lib/zod-schemas";

import { SHORT_REDIRECT_DOMAIN, SHORT_REDIRECT_URL } from "../constants";
import { db } from "../db";
import { sendWorkspaceInvite } from "../email";
import { WorkspaceSchema } from "../zod-schemas";
import { checkUser } from "./utils";

export const createWorkspace = async (data: WorkspaceSchema) => {
  const session = await auth();

  if (!session || !session.user || !session.user.id || !session.user.email) {
    return { error: "You must be signed in to create a workspace" };
  }

  const workspace = await db.workspace.create({
    data: {
      name: data.name,
      slug: data.slug,
      userId: session.user.id,
    },
  });

  await db.membership.create({
    data: {
      userId: session.user.id,
      workspaceId: workspace.id,
      role: MemberRole.ADMIN,
      email: session.user.email,
    },
  });
  return { success: "Workspace create successfully", workspace };
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

  const membership = await db.membership.findFirst({
    where: {
      userId: session.user.id,
      workspaceId: workspace.id,
    },
  });

  if (
    !membership ||
    membership.role !== "ADMIN" ||
    membership.userId !== session.user.id
  ) {
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
            role: MemberRole.MEMBER,
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

export const createLink = async (
  data: LinkSchema,
  workspaceId: string | null
) => {
  const user = await checkUser();

  if (!user || !user.id)
    return { error: "You must be signed in to create a link" };

  if (!workspaceId) return { error: "Workspace id is required" };

  const workspace = await db.workspace.findUnique({
    where: {
      slug: workspaceId,
    },
  });

  if (!workspace) return { error: "Workspace not found" };

  const slug = data.slug === "" ? generateRandomSlug() : data.slug;

  await db.link.create({
    data: {
      domain: SHORT_REDIRECT_DOMAIN ?? "clikz.live",
      key: slug,
      shortLink: new URL(`/${slug}`, SHORT_REDIRECT_URL).toString(),
      url: data.destination,
      userId: user.id,
      workspaceId: workspace.id,
      workspaceSlug: workspace.slug,
    },
  });

  return { success: "Link created successfully" };
};
