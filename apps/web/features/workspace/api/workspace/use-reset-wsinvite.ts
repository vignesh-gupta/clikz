import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":idOrSlug"]["reset-invite"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":idOrSlug"]["reset-invite"]["$post"]
>;

export const useResetWorkspaceInvite = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.workspaces[":idOrSlug"][
        "reset-invite"
      ].$post({
        param,
      });
      if (!res.ok) {
        const errorRes = (await res.json()) as unknown as { error: string };

        throw new Error(errorRes?.error ?? "Failed to reset invite");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.WORKSPACE],
      });
    },
    onError: (error) => toast.error(error.message ?? "Failed to reset invite"),
  });

  return mutation;
};
