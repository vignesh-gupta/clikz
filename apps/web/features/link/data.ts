import { db } from "~/lib/db";
import { FetchParamsSchema } from "~/lib/zod-schemas";

type GetWorkspaceLinks = FetchParamsSchema & {
  workspaceSlug: string;
};

export const getLinks = async ({
  workspaceSlug,
  page = 1,
  perPage = 10,
}: GetWorkspaceLinks) =>
  await db.link.findMany({
    where: { workspaceSlug },
    orderBy: { createdAt: "desc" },
    skip: page * perPage,
    take: perPage,
  });
