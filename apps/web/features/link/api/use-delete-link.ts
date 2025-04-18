import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

import { QUERY_KEYS } from "@clikz/utils/constants";

import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";
import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.links)[":linkId"]["$delete"],
  200
>;
type RequestType = {
  linkId: string;
};

export const useDeleteLink = () => {
  const queryClient = useQueryClient();

  const workspace = useWorkspaceSlug();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ linkId }) => {
      const res = await client.api.links[":linkId"].$delete({
        param: { linkId },
        query: { workspaceSlug: workspace },
      });

      if (!res.ok) {
        const errorRes = (await res.json()) as unknown as { error: string };

        throw new Error(errorRes?.error ?? "Failed to delete link");
      }

      return await res.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Link deleted!");
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.LINKS, workspace],
      });
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.LINK, data.id],
      });
    },
    onError: () => {
      toast.error("Failed to delete link");
    },
  });

  return mutation;
};
