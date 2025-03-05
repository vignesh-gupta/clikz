import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";
import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.domains)[":id"]["status"]["$patch"],
  201
>;
type RequestType = {
  id: string;
};

export const useUpdateDomainStatus = () => {
  const queryClient = useQueryClient();

  const workspaceSlug = useWorkspaceSlug();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ id }) => {
      const res = await client.api.domains[":id"].status.$patch({
        param: { id },
        query: {
          workspaceSlug,
        },
      });

      if (!res.ok) {
        const errorRes = (await res.json()) as unknown as { error: string };

        throw new Error(errorRes?.error ?? "Failed to update Domain Status");
      }

      return await res.json();
    },
    onSuccess: ({ isVerified, message }) => {
      toast.success(message);

      if (isVerified)
        queryClient.invalidateQueries({
          queryKey: [...QUERY_KEYS.DOMAINS, workspaceSlug],
        });
    },
    onError: () => {
      toast.error("Failed to update Domain Status");
    },
  });

  return mutation;
};
