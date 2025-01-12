import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

export const useGetWorkspaces = () =>
  useQuery({
    queryKey: QUERY_KEYS.WORKSPACES,
    queryFn: async () => {
      const response = await client.api.workspaces.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch workspaces");
      }

      return await response.json();
    },
  });
