import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":idOrSlug"]["members"]["leave"]["$delete"]
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":idOrSlug"]["members"]["leave"]["$delete"]
>;

export const useLeaveWorkspace = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.workspaces[":idOrSlug"].members[
        "leave"
      ].$delete({
        param,
      });

      if (!res.ok) {
        const errorRes = (await res.json()) as unknown as { error: string };
        console.log(errorRes);

        throw new Error(errorRes?.error ?? "Failed to leave workspace");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MEMBERS });
      router.refresh();
    },
    onError: (error) =>
      toast.error(error.message ?? "Failed to leave workspace"),
  });

  return mutation;
};
