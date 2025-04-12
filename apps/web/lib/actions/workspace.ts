"use server";

import { MemberRole } from "@prisma/client";

import { auth, signOut } from "~/auth";

import { db } from "../db";
import { WorkspaceSchema } from "../zod/schemas";

export const createWorkspace = async (data: WorkspaceSchema) => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error("You must be signed in to create a workspace");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    signOut();
    throw new Error("User not found, please sign in again");
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
