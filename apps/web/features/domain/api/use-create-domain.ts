import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";
import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.domains)["$post"],
  201
>;
type RequestType = InferRequestType<(typeof client.api.domains)["$post"]>;

export const useCreateDomain = () => {
  const queryClient = useQueryClient();

  const workspaceSlug = useWorkspaceSlug();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (props) => {
      const res = await client.api.domains.$post(props);

      if (!res.ok) {
        const errorRes = (await res.json()) as unknown as { error: string };

        throw new Error(errorRes?.error ?? "Failed to create Domain");
      }

      return await res.json();
    },
    onSuccess: () => {
      toast.success("Domain Created!");
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.DOMAINS, workspaceSlug],
      });
    },
    onError: () => {
      toast.error("Failed to create Domain");
    },
  });

  return mutation;
};
