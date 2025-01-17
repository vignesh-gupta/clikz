import { MemberRole } from "@prisma/client";
import {
  LogOutIcon,
  MoreVertical,
  TrashIcon,
  UserRoundCog,
} from "lucide-react";
import { useSession } from "next-auth/react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@clikz/ui/components/ui/avatar";
import { Button } from "@clikz/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@clikz/ui/components/ui/dropdown-menu";
import { capitalizeFirstLetter } from "@clikz/ui/lib/utils";

import { useGetWorkspaceMembers } from "~/features/workspace/api/members/use-get-workspace-members";
import { AVATAR_URL } from "~/lib/constants";

import { TeamSettingsProps, TeamsLoading } from "./team-settings";

const MembersTab = ({ workspaceId }: TeamSettingsProps) => {
  const { data: members, isLoading } = useGetWorkspaceMembers({ workspaceId });

  const { data: currentSession } = useSession();

  if (!currentSession) return null;

  const currentUserRoleIndex = members?.findIndex(
    (m) => m.email === currentSession.user?.email
  );

  if (!currentUserRoleIndex || currentUserRoleIndex == -1) return null;

  const currentUserRole = members?.[currentUserRoleIndex];
  members?.splice(currentUserRoleIndex, 1);

  if (currentUserRole) members?.unshift(currentUserRole);

  if (isLoading) return <TeamsLoading />;
  return members?.map((member) => (
    <div key={member.id} className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            className="rounded-full"
            src={member.image ?? `${AVATAR_URL}${member.name || member.email}`}
          />
          <AvatarFallback>
            {(member.name || member.email)
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{member.name}</p>
          <p className="text-sm text-muted-foreground">{member.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {capitalizeFirstLetter(member.role)}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              disabled={currentUserRole?.role !== MemberRole.ADMIN}
            >
              <UserRoundCog className="size-4 mr-1" /> Change role
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              {member.email === currentSession.user?.email ? (
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
      </div>
    </div>
  ));
};
export default MembersTab;
