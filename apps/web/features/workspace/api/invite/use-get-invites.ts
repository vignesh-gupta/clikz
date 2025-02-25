import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type GetInvites = {
  idOrSlug: string;
  queryKey?: string[];
};

export const useGetInvites = ({ idOrSlug, queryKey }: GetInvites) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.INVITES, idOrSlug, ...(queryKey ?? [])],
    queryFn: async () => {
      const res = await client.api.workspaces[":idOrSlug"].invites.$get({
        param: { idOrSlug },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch workspace invites");
      }

      return await res.json();
    },
  });
};
