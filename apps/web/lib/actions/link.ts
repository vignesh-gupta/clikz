/* eslint-disable turbo/no-undeclared-env-vars */
"use server";

import { db } from "~/lib/db";
import { LinkSchema } from "~/lib/zod-schemas";
import { checkUser } from "./utils";
import { generateRandomSlug } from "~/lib/utils/generate";

export const createLink = async (data: LinkSchema) => {
  const user = await checkUser();

  if (!user || !user.id)
    return { error: "You must be signed in to create a link" };

  console.log("Creating link", data);

  await db.link.create({
    data: {
      domain: process.env.NEXT_PUBLIC_APP_DOMAIN ?? "clikz.co",
      key: data.slug === "" ? generateRandomSlug() : data.slug,
      url: data.destination,
      userId: user.id,
    },
  });

  return { success: "Link created successfully" };
};
