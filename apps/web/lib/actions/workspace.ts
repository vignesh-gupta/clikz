"use server"

import { auth } from "~/auth";
import { db } from "../db";
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
