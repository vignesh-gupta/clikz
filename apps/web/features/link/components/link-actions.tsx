"use client";

import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@clikz/ui/components/ui/dropdown-menu";

import { useLinkModel } from "../hooks/use-link-modal";

type LinkActionsProps = {
  linkId: string;
};

const LinkActions = ({ linkId }: LinkActionsProps) => {
  const { open } = useLinkModel();

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
        <DropdownMenuItem>Copy link</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinkActions;
