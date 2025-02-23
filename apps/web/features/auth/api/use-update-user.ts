import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.users)[":userId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.users)[":userId"]["$patch"]
>;

export const useUpdateUser = () => {
  const { update } = useSession();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (args) => {
      const res = await client.api.users[":userId"].$patch(args);

      if (!res.ok) {
        const errorRes = (await res.json()) as unknown as { error: string };

        throw new Error(errorRes?.error ?? "Failed to update your details");
      }
      return await res.json();
    },
    onSuccess: (user) => {
      update(user);
      toast.success("Updated your details!");
    },
    onError: (error) =>
      toast.error(error.message ?? "Failed to update your details"),
  });

  return mutation;
};
