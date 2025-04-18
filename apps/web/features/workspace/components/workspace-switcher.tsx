"use client";

import { useRouter } from "next/navigation";

import { PlusIcon } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@clikz/ui/components/ui/select";
import { Skeleton } from "@clikz/ui/components/ui/skeleton";
import { cn } from "@clikz/ui/lib/utils";

import { useGetWorkspaces } from "../api/use-get-workspaces";
import { useWorkspaceModel } from "../hooks/use-workspace-modal";
import { useWorkspaceSlug } from "../hooks/use-workspace-slug";
import WorkspaceIcon from "./workspace-icon";

type WorkspaceSwitcherProps = {
  className?: string;
};

const WorkspaceSwitcher = ({ className }: WorkspaceSwitcherProps) => {
  const { data: workspaces, isLoading } = useGetWorkspaces();
  const slug = useWorkspaceSlug();

  const { open } = useWorkspaceModel();

  const router = useRouter();

  const onSelect = (value: string) => {
    if (value !== "none") {
      router.push(`/${value}`);
    }
  };

  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
      {isLoading ? (
        <Skeleton className="w-full h-11" />
      ) : (
        <Select onValueChange={onSelect} value={slug}>
          <SelectTrigger className="w-full h-auto font-medium border border-neutral-200 ring-0">
            <SelectValue placeholder="No workspace selected" />
          </SelectTrigger>
          <SelectContent>
            {Number(workspaces?.length ?? 0) > 0 ? (
              workspaces?.map((workspace) => (
                <SelectItem key={workspace.id} value={workspace.slug}>
                  <div className="flex items-center justify-start gap-3 font-medium">
                    <WorkspaceIcon
                      name={workspace.slug}
                      image={workspace.icon ?? undefined}
                      height={10}
                      width={10}
                    />
                    <div className="flex flex-col items-start">
                      <span className="truncate">{workspace.name}</span>
                      <span className="text-xs truncate text-muted-foreground">
                        Free
                      </span>
                    </div>
                  </div>
                </SelectItem>
              ))
            ) : (
              <SelectItem disabled value="none">
                <span>No Workspaces</span>
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      )}

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
