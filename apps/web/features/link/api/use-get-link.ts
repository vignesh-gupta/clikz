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

      const { data, error } = await res.json();

      if (!res.ok || error) {
        toast.error(
          error?.message || "Something went wrong. Please try again later."
        );
        throw new Error(error?.message || "Failed to fetch link");
      }

      return data;
    },
  });
};
