import { DomainStatus } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";
import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type GetDomainStatus = {
  id: string;
  domain: string;
  currentStatus: DomainStatus;
};

export const useGetDomainStatus = ({
  id,
  domain,
  currentStatus,
}: GetDomainStatus) => {
  const workspaceSlug = useWorkspaceSlug();
  return useQuery({
    queryKey: [...QUERY_KEYS.DOMAIN, id, domain],
    queryFn: async () => {
      if (domain === "localtest.com")
        return { status: "VERIFIED", verifications: [] };
      const res = await client.api.domains[":id"].status.$patch({
        param: { id },
        query: {
          workspaceSlug,
        },
        json: {
          slug: domain,
          currentStatus,
        },
      });

      return await res.json();
    },
  });
};
