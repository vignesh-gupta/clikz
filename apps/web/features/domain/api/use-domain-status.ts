import { DomainStatus } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@clikz/utils/constants";

import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";
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
    initialData:
      currentStatus === "VERIFIED"
        ? {
            status: currentStatus,
            verifications: [],
          }
        : undefined,
    queryKey: [...QUERY_KEYS.DOMAIN, domain],
    queryFn: async () => {
      if (domain === "clikzlocal.vigneshgupta.me")
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
