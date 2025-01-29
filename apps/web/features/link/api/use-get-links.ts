import { Link } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";
import { FetchParamsSchema } from "~/lib/zod-schemas";

type GetLinks = FetchParamsSchema & {
  workspaceSlug: string;
  initialLinks?: Link[];
  queryKey?: string[];
};

export const useGetLinks = ({
  workspaceSlug,
  initialLinks,
  queryKey,
  limit,
  page,
}: GetLinks) => {
  return useQuery({
    initialData: initialLinks,
    queryKey: [...QUERY_KEYS.LINKS, workspaceSlug, ...(queryKey ?? [])],
    queryFn: async () => {
      const res = await client.api.links.$get({
        query: {
          workspaceSlug,
          limit,
          page,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch links");
      }

      const { links } = await res.json();

      return links.map((link) => ({
        ...link,
        createdAt: new Date(link.createdAt),
        updatedAt: new Date(link.updatedAt),
      }));
    },
  });
};
