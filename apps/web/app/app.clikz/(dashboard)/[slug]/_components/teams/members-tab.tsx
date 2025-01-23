import { useSession } from "next-auth/react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@clikz/ui/components/ui/avatar";
import { capitalizeFirstLetter } from "@clikz/ui/lib/utils";

import { useGetMembers } from "~/features/workspace/api/members/use-get-members";
import { AVATAR_URL } from "~/lib/constants";

import MemberAction from "./member-action";
import { TeamSettingsProps, TeamsLoading } from "./team-settings";

const MembersTab = ({ workspaceId }: TeamSettingsProps) => {
  const { data: members, isLoading } = useGetMembers({ workspaceId });

  const { data: currentSession } = useSession();

  if (!currentSession || !currentSession.user || !currentSession.user.email)
    return null;

  const currentUserRole = members?.find(
    (m) => m.email === currentSession.user?.email
  )?.role;

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
        <MemberAction
          currentUserRole={currentUserRole}
          currentUser={currentSession.user}
          member={member}
        />
      </div>
    </div>
  ));
};
export default MembersTab;
