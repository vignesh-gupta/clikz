import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";
import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.links)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.links)["$post"]>;

export const useCreateLink = () => {
  const queryClient = useQueryClient();

  const workspaceSlug = useWorkspaceSlug();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (props) => {
      const res = await client.api.links.$post(props);

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return data;
    },
    onSuccess: ({ data: link }) => {
      toast.success("Link Created!");
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.LINKS, workspaceSlug],
      });
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.LINK, link?.id],
      });
    },
    onError: (e) => toast.error(e.message || "Failed to create link"),
  });

  return mutation;
};
