import { db } from "~/lib/db";

export const getWorkspaceLinks = async (workspaceSlug: string) =>
  await db.link.findMany({
    where: { workspaceSlug },
    orderBy: { createdAt: "desc" },
  });
