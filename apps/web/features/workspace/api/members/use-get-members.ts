import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@clikz/utils/constants";

import { client } from "~/lib/rpc";
import { WorkspaceMember } from "~/types/model.types";

type GetMembers = {
  idOrSlug: string;
  initialMembers?: WorkspaceMember[];
  queryKey?: string[];
};

export const useGetMembers = ({
  initialMembers,
  idOrSlug,
  queryKey,
}: GetMembers) => {
  return useQuery({
    initialData: initialMembers,
    queryKey: [...QUERY_KEYS.MEMBERS, idOrSlug, ...(queryKey ?? [])],
    queryFn: async () => {
      const res = await client.api.workspaces[":idOrSlug"].members.$get({
        param: {
          idOrSlug,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch workspace members");
      }

      return await res.json();
    },
  });
};
