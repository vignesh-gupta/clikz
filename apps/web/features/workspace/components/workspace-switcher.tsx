"use client";

import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";
import { RiAddCircleFill } from "react-icons/ri";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@clikz/ui/components/ui/select";

// import { useGetWorkspaces } from "../api/use-get-workspaces";
// import { useCreateWorkspaceModel } from "../hooks/use-create-workspace-model";
import { useGetWorkspaces } from "../api/use-get-workspaces";
import { useWorkspaceSlug } from "../hooks/use-workspace-slug";
import WorkspaceAvatar from "./workspace-avatar";

const WorkspaceSwitcher = () => {
  const { data: workspaces, isLoading } = useGetWorkspaces();
  const workspaceId = useWorkspaceSlug();
  // const { open } = useCreateWorkspaceModel();

  const open = () => {};

  const router = useRouter();

  const onSelect = (value: string) => {
    if (value !== "none") {
      router.push(`/${value}`);
    }
  };

  console.log("workspaces", workspaces);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 hover:opacity-75 transition cursor-pointer"
        />
      </div>

      <Select onValueChange={onSelect} value={workspaceId}>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent>
          {isLoading && (
            <SelectItem disabled value="none">
              <div className="flex text-neutral-700">
                <Loader2 className="mr-2 animate-spin size-5" /> Loading...
              </div>
            </SelectItem>
          )}
          {!isLoading &&
            Number(workspaces?.length ?? 0) > 0 &&
            workspaces?.map((workspace) => (
              <SelectItem key={workspace.id} value={workspace.slug}>
                <div className="flex justify-start items-center gap-3 font-medium">
                  <WorkspaceAvatar name={workspace.name} />
                  <span className="truncate">{workspace.name}</span>
                </div>
              </SelectItem>
            ))}
          {!isLoading && !workspaces?.length && (
            <SelectItem disabled value="none">
              <span>No Workspaces</span>
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WorkspaceSwitcher;
