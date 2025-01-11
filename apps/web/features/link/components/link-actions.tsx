"use client";

import { MoreHorizontalIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@clikz/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@clikz/ui/components/ui/dropdown-menu";

import { useDeleteLink } from "../api/use-delete-link";
import { useLinkModel } from "../hooks/use-link-modal";

type LinkActionsProps = {
  linkId: string;
  shortUrl: string;
};

const LinkActions = ({ linkId, shortUrl }: LinkActionsProps) => {
  const { open } = useLinkModel();

  const { mutate: deleteLink } = useDeleteLink();

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Link copied to clipboard");
  };

  const handleDelete = () => {
    deleteLink({ param: { linkId } });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => open(linkId)}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopy}>Copy link</DropdownMenuItem>
        <DropdownMenuItem
          className="hover:bg-destructive hover:text-destructive-foreground"
          onClick={handleDelete}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinkActions;
