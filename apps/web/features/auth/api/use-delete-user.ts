import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.users)[":userId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.users)[":userId"]["$delete"]
>;

export const useDeleteUser = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (args) => {
      const res = await client.api.users[":userId"].$delete(args);

      if (!res.ok) {
        const errorRes = (await res.json()) as unknown as { error: string };

        throw new Error(errorRes?.error ?? "Failed to update your account");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast.success("Requested Deletion! A confirmation email has been sent.");
    },
    onError: (error) =>
      toast.error(error.message ?? "Failed to update your account"),
  });

  return mutation;
};
