import { Workspace } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@clikz/utils/constants";

import { client } from "~/lib/rpc";

type GetWorkspace = {
  idOrSlug: string;
  initialData?: Workspace;
  queryKey?: string[];
};

export const useGetWorkspace = ({
  idOrSlug,
  queryKey,
  initialData,
}: GetWorkspace) => {
  return useQuery({
    initialData,
    queryKey: [...QUERY_KEYS.WORKSPACE, idOrSlug, ...(queryKey ?? [])],
    queryFn: async () => {
      const res = await client.api.workspaces[":idOrSlug"].$get({
        param: { idOrSlug },
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
