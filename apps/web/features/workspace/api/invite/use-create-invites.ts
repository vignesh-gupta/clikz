import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":idOrSlug"]["invites"]["bulk-invite"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":idOrSlug"]["invites"]["bulk-invite"]["$post"]
>;

export const useCreateInvites = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (args) => {
      const res =
        await client.api.workspaces[":idOrSlug"].invites["bulk-invite"].$post(
          args
        );

      if (!res.ok) {
        const errorRes = (await res.json()) as unknown as { error: string };

        throw new Error(errorRes?.error ?? "Failed to create Invites");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast.success("Invites created!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INVITES });
      router.refresh();
    },
    onError: (error) =>
      toast.error(error.message ?? "Failed to create Invites"),
  });

  return mutation;
};
