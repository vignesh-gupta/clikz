import { useSession } from "next-auth/react";

import { capitalizeFirstLetter } from "@clikz/ui/lib/utils";

import UserAvatar from "~/features/auth/components/user-avatar";
import { useGetMembers } from "~/features/workspace/api/members/use-get-members";
import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";

import MemberAction from "./member-action";
import { TeamsLoading } from "./team-settings";

const MembersTab = () => {
  const slug = useWorkspaceSlug();

  const { data: members, isLoading } = useGetMembers({ idOrSlug: slug });

  const { data: currentSession } = useSession();

  if (!currentSession || !currentSession.user || !currentSession.user.email)
    return null;

  const currentUserRole = members?.find(
    (m) => m.email === currentSession.user?.email
  )?.role;

  if (isLoading) return <TeamsLoading />;

  if (!members?.length) return <p>No members found</p>;

  return (
    <div className="flex flex-col items-center py-4 gap-y-4">
      {members?.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between w-full px-4"
        >
          <div className="flex items-center gap-2 overflow-hidden sm:gap-4 grow">
            <UserAvatar email={member.email} image={member.image} />
            <div>
              <p className="text-sm font-medium">
                {member.name}{" "}
                {currentSession.user?.email === member.email ? "(You)" : null}
              </p>
              <p className="text-xs text-muted-foreground">{member.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs text-muted-foreground/80">
              {capitalizeFirstLetter(member.role)}
            </span>
            <MemberAction
              currentUserRole={currentUserRole}
              currentUser={currentSession.user}
              member={member}
              slug={slug}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default MembersTab;
