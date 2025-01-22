"use client";

import { useRouter } from "next/navigation";

import { Loader2, PlusIcon } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@clikz/ui/components/ui/select";

import { useGetWorkspaces } from "../api/use-get-workspaces";
import { useWorkspaceModel } from "../hooks/use-workspace-modal";
import { useWorkspaceSlug } from "../hooks/use-workspace-slug";
import WorkspaceAvatar from "./workspace-avatar";

const WorkspaceSwitcher = () => {
  const { data: workspaces, isLoading } = useGetWorkspaces();
  const workspaceId = useWorkspaceSlug();

  const { open } = useWorkspaceModel();

  const router = useRouter();

  const onSelect = (value: string) => {
    if (value !== "none") {
      router.push(`/${value}`);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <Select onValueChange={onSelect} value={workspaceId}>
        <SelectTrigger className="w-full font-medium p-1 border-0 ring-0">
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
                  <WorkspaceAvatar
                    name={workspace.slug}
                    image={workspace.icon ?? undefined}
                    height={10}
                    width={10}
                  />
                  <div className="flex flex-col items-start">
                    <span className="truncate">{workspace.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      Free
                    </span>
                  </div>
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
      <Button
        className="flex gap-2"
        variant="outline"
        onClick={() => open("new")}
      >
        <PlusIcon className="size-4" /> Add Workspace
      </Button>
    </div>
  );
};

export default WorkspaceSwitcher;
