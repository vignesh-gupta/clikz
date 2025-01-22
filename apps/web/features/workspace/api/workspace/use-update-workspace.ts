import { useParams, useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["$patch"]
>;

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const param = useParams();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const res = await client.api.workspaces[":workspaceId"].$patch({
        param,
        json,
      });

      if (!res.ok) {
        throw new Error("Failed to update Workspace");
      }
      return await res.json();
    },
    onSuccess: ({ id, slug }) => {
      if (slug !== param.slug) router.push(`/${slug}/settings`);
      else router.refresh();

      toast.success("Workspace Updated!");
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.WORKSPACE, id],
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORKSPACES,
      });
    },
    onError: (error) => toast.error(error.message ?? "Failed to delete Task"),
  });

  return mutation;
};
