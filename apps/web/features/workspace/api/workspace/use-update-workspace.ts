import { useParams, useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { QUERY_KEYS } from "@clikz/utils/constants";

import { client } from "~/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":idOrSlug"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":idOrSlug"]["$patch"]
>;

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const param = useParams();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const res = await client.api.workspaces[":idOrSlug"].$patch({
        param,
        json,
      });

      if (!res.ok) {
        const errorRes = (await res.json()) as unknown as { error: string };

        throw new Error(errorRes?.error ?? "Failed to update Workspace");
      }
      return await res.json();
    },
    onSuccess: ({ slug }) => {
      if (slug !== param.slug) router.push(`/${slug}/settings`);
      else router.refresh();

      toast.success("Workspace Updated!");
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.WORKSPACE, slug],
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORKSPACES,
      });
    },
    onError: (error) =>
      toast.error(error.message ?? "Failed to update Workspace"),
  });

  return mutation;
};
