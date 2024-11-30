import { useParams } from "next/navigation";

export const useWorkspaceSlug = () =>{
  const params = useParams();
  return params.slug as string;
}