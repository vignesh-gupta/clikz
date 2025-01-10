import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type GetLink = {
  linkId: string | null;
  queryKey?: string[];
};

export const useGetLink = ({ linkId, queryKey }: GetLink) => {
  if (!linkId || linkId === "new") {
    return {
      data: null,
      isLoading: false,
      error: null,
    };
  }

  return useQuery({
    queryKey: [...QUERY_KEYS.LINK, linkId, ...(queryKey ?? [])],
    queryFn: async () => {
      const res = await client.api.links[":linkId"].$get({
        param: { linkId },
      });

      if (!res.ok) {
        throw new Error("No link found");
      }

      const { link } = await res.json();

      return link;
    },
  });
};
