import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":idOrSlug"]["invites"]["resend"][":inviteId"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":idOrSlug"]["invites"]["resend"][":inviteId"]["$post"]
>;

export const useResendInvite = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.workspaces[":idOrSlug"].invites.resend[
        ":inviteId"
      ].$post({
        param,
      });
      if (!res.ok) {
        const errorRes = (await res.json()) as unknown as { error: string };

        throw new Error(errorRes?.error ?? "Failed to delete Invite");
      }
      return await res.json();
    },
    onSuccess: ({ user }) => toast.success(`Sent a new invite to ${user}!`),
    onError: (error) => toast.error(error.message ?? "Failed to delete Invite"),
  });

  return mutation;
};
