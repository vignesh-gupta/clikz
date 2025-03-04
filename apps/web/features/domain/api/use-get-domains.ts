import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";
import { DomainProp } from "~/lib/types";
import { FetchParamsSchema } from "~/lib/zod-schemas";

type GetDomains = FetchParamsSchema & {
  workspaceSlug: string;
  initialDomains?: DomainProp[];
  queryKey?: string[];
};

export const useGetDomains = ({
  workspaceSlug,
  initialDomains,
  queryKey,
  limit,
  page,
}: GetDomains) => {
  return useQuery<DomainProp[]>({
    initialData: initialDomains,
    queryKey: [...QUERY_KEYS.DOMAINS, workspaceSlug, ...(queryKey ?? [])],
    queryFn: async () => {
      const res = await client.api.domains.$get({
        query: {
          workspaceSlug,
          limit,
          page,
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
      })) as DomainProp[];
    },
  });
};
