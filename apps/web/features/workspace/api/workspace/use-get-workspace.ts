import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";
import { WorkspaceProp } from "~/lib/types";

type GetWorkspace = {
  workspaceId: string;
  initialData?: WorkspaceProp;
  queryKey?: string[];
};

export const useGetWorkspace = ({
  workspaceId,
  queryKey,
  initialData,
}: GetWorkspace) => {
  return useQuery({
    initialData,
    queryKey: [...QUERY_KEYS.WORKSPACE, workspaceId, ...(queryKey ?? [])],
    queryFn: async () => {
      const res = await client.api.workspaces[":workspaceId"].$get({
        param: { workspaceId },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch workspace");
      }

      const data = await res.json();

      if (!data) throw new Error("Workspace not found");

      return {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };
    },
  });
};
