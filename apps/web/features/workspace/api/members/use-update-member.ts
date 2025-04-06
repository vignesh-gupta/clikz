import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { QUERY_KEYS } from "@clikz/utils/constants";

import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":idOrSlug"]["members"][":membershipId"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":idOrSlug"]["members"][":membershipId"]["$patch"]
>;

export const useUpdateMember = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (args) => {
      const res =
        await client.api.workspaces[":idOrSlug"].members[
          ":membershipId"
        ].$patch(args);
      if (!res.ok) {
        const errorRes = (await res.json()) as unknown as { error: string };

        throw new Error(errorRes?.error ?? "Failed to update member role");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast.success("Role Updated!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MEMBERS });
      router.refresh();
    },
    onError: (error) =>
      toast.error(error.message ?? "Failed to update member role"),
  });

  return mutation;
};
