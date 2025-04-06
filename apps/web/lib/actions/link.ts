"use server";

import { generateRandomSlug } from "@clikz/utils/functions";

import { db } from "~/lib/db";
import { LinkSchema } from "~/lib/zod/schemas";

import { BASE_DOMAIN, BASE_URL } from "../constants";
import { checkUser } from "./utils";

export const createLink = async (
  data: LinkSchema,
  workspaceSlug: string | null
) => {
  const user = await checkUser();

  if (!user || !user.id)
    return { error: "You must be signed in to create a link" };

  if (!workspaceSlug) return { error: "Workspace is required" };

  const workspace = await db.workspace.findUnique({
    where: {
      slug: workspaceSlug,
    },
  });

  if (!workspace) return { error: "Workspace not found" };

  const linkSlug = data.slug === "" ? generateRandomSlug() : data.slug;

  await db.link.create({
    data: {
      domain: BASE_DOMAIN ?? "clikz.live",
      key: linkSlug,
      shortLink: new URL(`/${linkSlug}`, BASE_URL).toString(),
      url: data.destination,
      userId: user.id,
      workspaceId: workspace.id,
      workspaceSlug: workspace.slug,
    },
  });

  return { success: "Link created successfully" };
};
