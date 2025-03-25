import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type GetLink = {
  linkId: string | null;
  queryKey?: string[];
};

export const useGetLink = ({ linkId, queryKey }: GetLink) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.LINK, linkId, ...(queryKey ?? [])],
    queryFn: async () => {
      if (!linkId) {
        throw new Error("Link ID is required");
      }
      if (linkId === "new") {
        return null;
      }

      const res = await client.api.links[":linkId"].$get({
        param: { linkId },
      });

      if (!res.ok) {
        toast.error("Something went wrong. Please try again later.");
        return null;
      }

      const { data } = await res.json();

      return data;
    },
  });
};
