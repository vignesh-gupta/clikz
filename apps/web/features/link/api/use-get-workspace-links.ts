import { Link } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type GetWorkspaceLinks = {
  workspaceSlug: string;
  initialLinks: Link[];
  queryKey?: string[];
};

export const useGetWorkspaceLinks = ({
  workspaceSlug,
  initialLinks,
  queryKey,
}: GetWorkspaceLinks) => {
  return useQuery({
    initialData: initialLinks.map((link) => ({
      ...link,
      createdAt: link.createdAt.toISOString(),
      updatedAt: link.updatedAt.toISOString(),
    })),
    queryKey: [...QUERY_KEYS.LINKS, workspaceSlug, ...(queryKey ?? [])],
    queryFn: async () => {
      const res = await client.api.links.$get({
        query: {
          slug: workspaceSlug,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch links");
      }

      const { link } = await res.json();

      return link;
    },
  });
};
