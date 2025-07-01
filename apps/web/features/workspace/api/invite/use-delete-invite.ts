import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { QUERY_KEYS } from "@clikz/utils/constants";

import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":idOrSlug"]["invites"][":inviteId"]["$delete"]
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":idOrSlug"]["invites"][":inviteId"]["$delete"]
>;

export const useDeleteInvite = () => {
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    meta: {
      invalidateQueries: [QUERY_KEYS.INVITES],
    },
    mutationFn: async ({ param }) => {
      const res = await client.api.workspaces[":idOrSlug"].invites[
        ":inviteId"
      ].$delete({
        param,
      });
      if (!res.ok) {
        const errorRes = (await res.json()) as unknown as { error: string };

        throw new Error(errorRes?.error ?? "Failed to delete Invite");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast.success("Invite deleted!");
      router.refresh();
    },
    onError: (error) => toast.error(error.message ?? "Failed to delete Invite"),
  });

  return mutation;
};
