"use client";

import { useState } from "react";

import { CheckIcon, CopyIcon, Link2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@clikz/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@clikz/ui/components/ui/dialog";

import { DATA_PREFIX } from "~/lib/constants";

import { useGetWorkspace } from "../api/workspace/use-get-workspace";
import { useResetWorkspaceInvite } from "../api/workspace/use-reset-wsinvite";
import { useWorkspaceSlug } from "../hooks/use-workspace-slug";

const WorkspaceInvite = () => {
  const [copy, setCopy] = useState(false);

  const slug = useWorkspaceSlug();
  const { data: workspace, isLoading } = useGetWorkspace({ idOrSlug: slug });
  const { mutate: resetInvite } = useResetWorkspaceInvite();

  const handleCopy = () => {
    setCopy(true);
    navigator.clipboard
      .writeText(
        `https://app.clikz.live/join/${DATA_PREFIX.WORKSPACE_INVITE}${workspace?.defaultInvite}`
      )
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy link to clipboard");
      });
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Link2Icon className="h-4 w-4" />
          <span className="sr-only">Copy invite link</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-xl max-w-md p-10 flex items-center flex-col">
        <DialogHeader className="flex items-center">
          <DialogTitle className="sr-only">Clikz</DialogTitle>
          <h3 className="text-lg font-semibold">Invite Link</h3>
          <p className="text-muted-foreground text-pretty text-center text-sm">
            Share this link to invite teammates to this workspace and start
            collaborating
          </p>
        </DialogHeader>
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-1.5 gap-2">
            <p className="text-sm text-muted-foreground truncate">
              {`https://app.clikz.live/join/${DATA_PREFIX.WORKSPACE_INVITE}${workspace?.defaultInvite}`}
            </p>
            <Button variant="outline" className="size-10" onClick={handleCopy}>
              {copy ? (
                <CheckIcon className="size-4 " />
              ) : (
                <CopyIcon className="size-4 " />
              )}
            </Button>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => resetInvite({ param: { idOrSlug: slug } })}
            disabled={isLoading}
          >
            Reset Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceInvite;
