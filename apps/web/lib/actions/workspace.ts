"use server";

import { MemberRole } from "@prisma/client";

import { signOut } from "~/auth";

import { db } from "../db";
import { WorkspaceSchema } from "../zod/schemas";
import { getUser } from "./utils";

export const createWorkspace = async (data: WorkspaceSchema) => {
  try {
    const currentUser = await getUser();
    const user = await db.user.findUnique({
      where: {
        id: currentUser.id,
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
      await setUserDefaultWorkspace(workspace.slug, user.id);
    }

    return { success: "Workspace create successfully", workspace };
  } catch (error) {
    console.error("Error creating workspace:", error);
    return { error: "Error creating workspace" };
  }
};

export const setUserDefaultWorkspace = async (
  workspaceSlug: string,
  userId: string
) =>
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      defaultWorkspace: workspaceSlug,
    },
  });
