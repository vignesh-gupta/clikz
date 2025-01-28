import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";
import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.links)["$post"], 200>;
type RequestType = InferRequestType<(typeof client.api.links)["$post"]>;

export const useCreateLink = () => {
  const queryClient = useQueryClient();

  const workspaceSlug = useWorkspaceSlug();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (props) => {
      const res = await client.api.links.$post(props);

      if (!res.ok) {
        const errorRes = (await res.json()) as unknown as { error: string };

        throw new Error(errorRes?.error ?? "Failed to create link");
      }

      return await res.json();
    },
    onSuccess: ({ link }) => {
      toast.success("Link Created!");
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.LINKS, workspaceSlug],
      });
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.LINK, link.id],
      });
    },
    onError: () => {
      toast.error("Failed to create link");
    },
  });

  return mutation;
};
