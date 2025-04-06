import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { QUERY_KEYS } from "@clikz/utils/constants";

import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":idOrSlug"]["members"][":membershipId"]["$delete"]
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":idOrSlug"]["members"][":membershipId"]["$delete"]
>;

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.workspaces[":idOrSlug"].members[
        ":membershipId"
      ].$delete({
        param,
      });

      if (!res.ok) {
        const errorRes = (await res.json()) as unknown as { error: string };

        throw new Error(errorRes?.error ?? "Failed to delete member");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast.success("Member removed!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MEMBERS });
      router.refresh();
    },
    onError: (error) => toast.error(error.message ?? "Failed to delete Invite"),
  });

  return mutation;
};
