import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";
import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.links)[":linkId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.links)[":linkId"]["$delete"]
>;

export const useDeleteLink = () => {
  const queryClient = useQueryClient();

  const workspace = useWorkspaceSlug();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.links[":linkId"].$delete({
        param,
      });

      if (!res.ok) {
        const errorRes = (await res.json()) as unknown as { error: string };

        throw new Error(errorRes?.error ?? "Failed to delete link");
      }

      return await res.json();
    },
    onSuccess: ({ link }) => {
      toast.success("Link deleted!");
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.LINKS, workspace],
      });
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.LINK, link.id],
      });
    },
    onError: () => {
      toast.error("Failed to delete link");
    },
  });

  return mutation;
};
