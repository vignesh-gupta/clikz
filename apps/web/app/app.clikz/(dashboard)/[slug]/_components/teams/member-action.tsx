import { MemberRole } from "@prisma/client";
import {
  LogOutIcon,
  MoreVertical,
  UserRoundCog,
  UserRoundX,
} from "lucide-react";
import { User } from "next-auth";

import { Button } from "@clikz/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@clikz/ui/components/ui/dropdown-menu";

import { useDeleteMember } from "~/features/workspace/api/members/use-delete-member";
import { useLeaveWorkspace } from "~/features/workspace/api/members/use-leave-workspace";
import { useUpdateMember } from "~/features/workspace/api/members/use-update-member";
import { WorkspaceMember } from "~/lib/types";

type MemberActionProps = {
  member: WorkspaceMember;
  currentUser?: User;
  currentUserRole?: MemberRole;
  workspaceId: string;
};

const MemberAction = ({
  currentUser,
  member,
  currentUserRole,
  workspaceId,
}: MemberActionProps) => {
  const { mutate: updateMember } = useUpdateMember();
  const { mutate: deleteMember } = useDeleteMember();
  const { mutate: leaveWorkspace } = useLeaveWorkspace();

  if (
    currentUserRole !== MemberRole.ADMIN &&
    currentUser?.email !== member.email
  ) {
    return null;
  }

  const handleRoleChange = (role: MemberRole) =>
    updateMember({
      json: { role },
      param: {
        workspaceId,
        membershipId: member.id,
      },
    });

  const handleRemoveMember = () => {
    if (currentUser?.email === member.email) {
      console.log("leave workspace");

      return leaveWorkspace({
        param: {
          workspaceId,
        },
      });
    }

    deleteMember({
      param: {
        workspaceId,
        membershipId: member.id,
      },
    });
  };

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
          onClick={() =>
            handleRoleChange(member.role === "ADMIN" ? "MEMBER" : "ADMIN")
          }
        >
          <UserRoundCog className="size-4 mr-1" /> Change role
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive"
          onClick={handleRemoveMember}
        >
          {member.email === currentUser?.email ? (
            <>
              <LogOutIcon className="size-4 mr-1" />
              Leave workspace
            </>
          ) : (
            <>
              <UserRoundX className="size-4 mr-1" />
              Remove member
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MemberAction;
