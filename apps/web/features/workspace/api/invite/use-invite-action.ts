import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { ErrorResponse } from "~/lib/backend/error";
import { client } from "~/lib/rpc";
import { InviteActionSchema } from "~/lib/zod/schemas";

type ResponseType = InferResponseType<
  (typeof client.api.invite.action)["$post"],
  200
>;
type RequestType = InviteActionSchema;

export const useInvitesAction = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.invite.action.$post({ json });

      if (!res.ok) {
        const errorRes = (await res.json()) as unknown as ErrorResponse;
        throw new Error(
          errorRes?.error.message ?? `Failed to ${json.action} invite`
        );
      }
      return await res.json();
    },
    onError: console.log,
  });

  return mutation;
};
