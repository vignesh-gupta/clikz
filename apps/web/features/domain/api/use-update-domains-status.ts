import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";
import { QUERY_KEYS } from "~/lib/constants";
import { client } from "~/lib/rpc";

import { getDomainStatus } from "../data";

type ResponseType = InferResponseType<
  (typeof client.api.domains)[":id"]["status"]["$patch"],
  201
>;
type RequestType = {
  id: string;
  slug: string;
};

export const useUpdateDomainStatus = () => {
  const queryClient = useQueryClient();

  const workspaceSlug = useWorkspaceSlug();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ id, slug }) => {
      const { status, verifications } = await getDomainStatus(slug);

      if (status === "VERIFIED") {
        const res = await client.api.domains[":id"].status.$patch({
          param: { id },
          query: {
            workspaceSlug,
          },
          json: {
            status,
          },
        });

        if (!res.ok) {
          const errorRes = (await res.json()) as unknown as { error: string };

          throw new Error(errorRes?.error ?? "Failed to update Domain Status");
        }
      }

      return { verified: status === "VERIFIED", verifications };
    },
    onSuccess: ({ verified }) => {
      if (verified) {
        queryClient.invalidateQueries({
          queryKey: [...QUERY_KEYS.DOMAINS, workspaceSlug],
        });
        toast.success("Domain is verified successfully");
      } else {
        toast.error("Domain is not verified");
      }
    },
    onError: () => {
      toast.error("Failed to update Domain Status");
    },
  });

  return mutation;
};
