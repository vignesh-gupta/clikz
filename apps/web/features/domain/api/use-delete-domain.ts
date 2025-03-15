import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";
import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.domains)[":id"]["$delete"]
>;
type RequestType = {
  id: string;
};

export const useDeleteDomain = () => {
  const queryClient = useQueryClient();

  const workspaceSlug = useWorkspaceSlug();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (props) => {
      const res = await client.api.domains[":id"].$delete({
        param: props,
        query: {
          workspaceSlug,
        },
      });

      if (!res.ok) {
        const errorRes = (await res.json()) as unknown as { error: string };

        throw new Error(errorRes?.error ?? "Failed to delete Domain");
      }

      return await res.json();
    },
    onSuccess: async ({ domain, message }) => {
      toast.success(message);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [...QUERY_KEYS.DOMAINS, workspaceSlug],
        }),
        queryClient.invalidateQueries({
          queryKey: [...QUERY_KEYS.LINKS, workspaceSlug],
        }),
        queryClient.removeQueries({
          queryKey: [...QUERY_KEYS.DOMAIN, domain?.name],
          exact: true,
        }),
      ]);
    },
    onError: () => {
      toast.error("Failed to delete Domain");
    },
  });

  return mutation;
};
