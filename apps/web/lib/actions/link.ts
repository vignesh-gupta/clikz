/* eslint-disable turbo/no-undeclared-env-vars */
"use server";

import { db } from "~/lib/db";
import { LinkSchema } from "~/lib/zod-schemas";
import { checkUser } from "./utils";
import { generateRandomSlug } from "~/lib/utils/generate";

export const createLink = async (
  data: LinkSchema,
  workspaceId: string | null,
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

  await db.link.create({
    data: {
      domain: process.env.NEXT_PUBLIC_APP_DOMAIN ?? "clikz.co",
      key: data.slug === "" ? generateRandomSlug() : data.slug,
      url: data.destination,
      userId: user.id,
      workspaceId: workspace.id,
    },
  });

  return { success: "Link created successfully" };
};
