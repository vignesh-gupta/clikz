import { MemberRole } from "@prisma/client";
import {
  LogOutIcon,
  MoreVertical,
  TrashIcon,
  UserRoundCog,
} from "lucide-react";
import { User } from "next-auth";

import { Button } from "@clikz/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@clikz/ui/components/ui/dropdown-menu";

import { WorkspaceMember } from "~/lib/types";

type MemberActionProps = {
  member: WorkspaceMember;
  currentUser?: User;
  currentUserRole?: MemberRole;
};

const MemberAction = ({
  currentUser,
  member,
  currentUserRole,
}: MemberActionProps) => {
  console.log({
    isAdmin: currentUserRole === MemberRole.ADMIN,
    isCurrentUser: currentUser?.email === member.email,
  });

  // Return  null if the the current user is not an admin or the member is not the current user

  if (
    currentUserRole !== MemberRole.ADMIN &&
    currentUser?.email !== member.email
  ) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          disabled={
            currentUserRole !== MemberRole.ADMIN ||
            currentUser?.email === member.email
          }
        >
          <UserRoundCog className="size-4 mr-1" /> Change role
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">
          {member.email === currentUser?.email ? (
            <>
              <LogOutIcon className="size-4 mr-1" />
              Leave workspace
            </>
          ) : (
            <>
              <TrashIcon className="size-4 mr-1" />
              Remove member
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MemberAction;
