import { Domain } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";
import { FetchParamsSchema } from "~/lib/zod-schemas";

type GetDomains = FetchParamsSchema & {
  workspaceSlug: string;
  verified?: boolean;
  archived?: boolean;
  initialDomains?: Domain[];
  queryKey?: string[];
};

export const useGetDomains = ({
  workspaceSlug,
  verified = false,
  archived = false,
  initialDomains,
  queryKey,
  limit,
  page,
}: GetDomains) => {
  return useQuery({
    initialData: initialDomains,
    queryKey: [...QUERY_KEYS.DOMAINS, workspaceSlug, ...(queryKey ?? [])],
    queryFn: async () => {
      const res = await client.api.domains.$get({
        query: {
          workspaceSlug,
          limit,
          page,
          verified: verified ? "true" : undefined,
          archived: archived ? "true" : undefined,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch Domains");
      }

      const { domains } = await res.json();

      return domains.map((domain) => ({
        ...domain,
        createdAt: new Date(domain.createdAt),
        updatedAt: new Date(domain.updatedAt),
      })) as Domain[];
    },
  });
};
