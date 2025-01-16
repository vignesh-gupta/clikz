import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["$delete"]
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["$delete"]
>;

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  // const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.workspaces[":workspaceId"].$delete({
        param,
      });
      if (!res.ok) {
        const data = await res.json();
        if ("error" in data) {
          // throw new Error(data.error ?? "Failed to delete Task");
        }
        throw new Error("Failed to delete Task");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast.success("Task deleted!");
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.WORKSPACES],
      });

      // router.push("/dashboard");
    },
    onError: (error) => toast.error(error.message ?? "Failed to delete Task"),
  });

  return mutation;
};
