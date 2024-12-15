import { useParams, useSearchParams } from "next/navigation";

export const useWorkspaceSlug = () => {
  const params = useParams();

  if (!params.slug) {
    const searchParams = useSearchParams();
    return (
      searchParams.get("workspaceId") ??
      searchParams.get("workspaceSlug") ??
      searchParams.get("workspace") ??
      ""
    );
  }

  return params.slug as string;
};
