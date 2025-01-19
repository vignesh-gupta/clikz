import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type GetWorkspace = {
  workspaceId: string;
  queryKey?: string[];
};

export const useGetWorkspace = ({ workspaceId, queryKey }: GetWorkspace) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.WORKSPACE, workspaceId, ...(queryKey ?? [])],
    queryFn: async () => {
      const res = await client.api.workspaces[":workspaceId"].$get({
        param: { workspaceId },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch workspace");
      }

      return await res.json();
    },
  });
};
