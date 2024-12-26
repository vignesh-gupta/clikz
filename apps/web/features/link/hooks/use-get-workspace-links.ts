import { Link } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { getWorkspaceLinks } from "../data";

export const WORKSPACE_LINK_QUERY_KEYS = ["links"];

type GetWorkspaceLinks = {
  workspaceSlug: string;
  initialLinks?: Link[];
  queryKey?: string[];
};

export const useGetWorkspaceLinks = ({
  workspaceSlug,
  initialLinks,
  queryKey,
}: GetWorkspaceLinks) => {
  return useQuery({
    initialData: initialLinks,
    queryKey: [
      ...WORKSPACE_LINK_QUERY_KEYS,
      workspaceSlug,
      ...(queryKey ?? []),
    ],
    queryFn: async () => getWorkspaceLinks(workspaceSlug),
  });
};
