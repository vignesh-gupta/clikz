import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";
import { LinkProp } from "~/lib/types";
import { FetchParamsSchema } from "~/lib/zod-schemas";

type GetLinks = FetchParamsSchema & {
  workspaceSlug: string;
  initialLinks?: LinkProp[];
  queryKey?: string[];
};

export const useGetLinks = ({
  workspaceSlug,
  initialLinks,
  queryKey,
}: GetLinks) => {
  return useQuery({
    initialData: initialLinks,
    queryKey: [...QUERY_KEYS.LINKS, workspaceSlug, ...(queryKey ?? [])],
    queryFn: async () => {
      const res = await client.api.links.$get({
        query: {
          workspaceSlug,
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
