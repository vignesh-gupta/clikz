import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type GetWorkspaceMembers = {
  workspaceId: string;
  queryKey?: string[];
};

export const useGetWorkspaceInvites = ({
  workspaceId,
  queryKey,
}: GetWorkspaceMembers) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.INVITES, workspaceId, ...(queryKey ?? [])],
    queryFn: async () => {
      const res = await client.api.workspaces[":workspaceId"].invites.$get({
        param: { workspaceId },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch workspace invites");
      }

      return await res.json();
    },
  });
};
