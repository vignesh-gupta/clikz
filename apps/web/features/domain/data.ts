import { db } from "~/lib/db";
import { FetchParamsSchema } from "~/lib/zod-schemas";

type GetWorkspaceDomains = FetchParamsSchema & {
  workspaceSlug: string;
  verified?: boolean;
};

export const getDomains = async ({
  workspaceSlug,
  verified,
  page = "0",
  limit = "10",
}: GetWorkspaceDomains) =>
  await db.domain.findMany({
    where: { workspaceSlug, status: verified ? "VERIFIED" : undefined },
    orderBy: { createdAt: "desc" },
    skip: parseInt(page) * parseInt(limit),
    take: parseInt(limit),
    include: {
      DomainVerification: true,
    },
  });
