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
import { WorkspaceMember } from "~/types/model.types";

type MemberActionProps = {
  member: WorkspaceMember;
  currentUser?: User;
  currentUserRole?: MemberRole;
  slug: string;
};

const MemberAction = ({
  currentUser,
  member,
  currentUserRole,
  slug,
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
        idOrSlug: slug,
        membershipId: member.id,
      },
    });

  const handleRemoveMember = () => {
    if (currentUser?.email === member.email) {
      return leaveWorkspace({
        param: {
          idOrSlug: slug,
        },
      });
    }

    deleteMember({
      param: {
        idOrSlug: slug,
        membershipId: member.id,
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="sm:size-8 size-6">
          <MoreVertical className="size-4" />
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
          <UserRoundCog className="mr-1 size-4" /> Change role
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive"
          onClick={handleRemoveMember}
        >
          {member.email === currentUser?.email ? (
            <>
              <LogOutIcon className="mr-1 size-4" />
              Leave workspace
            </>
          ) : (
            <>
              <UserRoundX className="mr-1 size-4" />
              Remove member
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MemberAction;
