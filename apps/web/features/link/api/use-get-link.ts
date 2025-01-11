import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type GetLink = {
  linkId: string | null;
  queryKey?: string[];
};

export const useGetLink = ({ linkId, queryKey }: GetLink) => {
  if (!linkId) {
    throw new Error("Link ID is required");
  }

  return useQuery({
    queryKey: [...QUERY_KEYS.LINK, linkId, ...(queryKey ?? [])],
    queryFn: async () => {
      if (linkId === "new") {
        return { link: null };
      }

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
