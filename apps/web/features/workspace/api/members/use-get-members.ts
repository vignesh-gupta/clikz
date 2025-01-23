import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";
import { WorkspaceMember } from "~/lib/types";

type GetMembers = {
  workspaceId: string;
  initialMembers?: WorkspaceMember[];
  queryKey?: string[];
};

export const useGetMembers = ({
  initialMembers,
  workspaceId,
  queryKey,
}: GetMembers) => {
  return useQuery({
    initialData: initialMembers,
    queryKey: [...QUERY_KEYS.MEMBERS, workspaceId, ...(queryKey ?? [])],
    queryFn: async () => {
      const res = await client.api.workspaces[":workspaceId"].members.$get({
        param: {
          workspaceId: workspaceId,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch workspace members");
      }

      return await res.json();
    },
  });
};
