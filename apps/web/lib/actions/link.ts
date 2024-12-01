/* eslint-disable turbo/no-undeclared-env-vars */
"use server";

import { db } from "~/lib/db";
import { generateRandomSlug } from "~/lib/utils/generate";
import { LinkSchema } from "~/lib/zod-schemas";

import { BASE_URL } from "../constants";
import { checkUser } from "./utils";

/* eslint-disable turbo/no-undeclared-env-vars */

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
      domain: process.env.NEXT_PUBLIC_APP_DOMAIN ?? "clikz.co",
      key: slug,
      shortLink: new URL(`/${slug}`, BASE_URL).toString(),
      url: data.destination,
      userId: user.id,
      workspaceId: workspace.id,
      workspaceSlug: workspace.slug,
    },
  });

  return { success: "Link created successfully" };
};
