"use server"

import { db } from "~/lib/db";
import { LinkSchema } from "~/lib/zod-schemas";
import { checkUser } from "./utils";

export const createLink = async (data: LinkSchema) => {
  const user = await checkUser();

  if (!user || !user.id) {
    return { error: "You must be signed in to create a link" };
  }

  await db.link.create({
    data: {
      domain: "clikz.co",
      key: data.slug,
      url: data.destination,
      userId: user.id,
    },
  });

  return { success: "Link created successfully" };
};
