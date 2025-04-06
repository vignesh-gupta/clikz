"use server";

import { MemberRole } from "@prisma/client";

import { generateInviteCode, generateRandomSlug } from "@clikz/utils/functions";

import { auth, signOut } from "~/auth";
import { LinkSchema } from "~/lib/zod/schemas";

import { BASE_DOMAIN, BASE_URL } from "../constants";
import { db } from "../db";
import { sendWorkspaceInvite } from "../email";
import { WorkspaceSchema } from "../zod/schemas";
import { checkUser } from "./utils";

export const createWorkspace = async (data: WorkspaceSchema) => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return { error: "You must be signed in to create a workspace" };
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    signOut();
    return { error: "User not found" };
  }

  const workspace = await db.workspace.create({
    data: {
      name: data.name,
      slug: data.slug,
      ownerId: user.id,
    },
  });

  await db.membership.create({
    data: {
      userId: user.id,
      workspaceId: workspace.id,
      role: MemberRole.ADMIN,
      email: user.email,
    },
  });

  if (!user.defaultWorkspace) {
    await setUserDefaultWorkspace(workspace.slug);
  }

  return { success: "Workspace create successfully", workspace };
};

export const setUserDefaultWorkspace = async (workspaceSlug: string) => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) return;

  await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      defaultWorkspace: workspaceSlug,
    },
  });
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
  workspaceSlug: string | null
) => {
  const user = await checkUser();

  if (!user || !user.id)
    return { error: "You must be signed in to create a link" };

  if (!workspaceSlug) return { error: "Workspace Slug is required" };

  const workspace = await db.workspace.findUnique({
    where: {
      slug: workspaceSlug,
    },
  });

  if (!workspace) return { error: "Workspace not found" };

  const slug = data.slug || generateRandomSlug();

  const domainURL = new URL(data.domain ? `https://${data.domain}` : BASE_URL);

  await db.link.create({
    data: {
      domain: data.domain || BASE_DOMAIN,
      key: slug,
      shortLink: new URL(`/${slug}`, domainURL).toString(),
      url: data.destination,
      userId: user.id,
      workspaceId: workspace.id,
      workspaceSlug: workspace.slug,
    },
  });

  return { success: "Link created successfully" };
};
