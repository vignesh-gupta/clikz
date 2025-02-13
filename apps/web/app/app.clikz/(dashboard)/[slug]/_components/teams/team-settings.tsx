"use client";

import { Skeleton } from "@clikz/ui/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@clikz/ui/components/ui/tabs";

import MemberInviteDialog from "~/features/workspace/components/member/member-invite-dialog";
import WorkspaceInvite from "~/features/workspace/components/workspace-invite";

import { useTeamNavigation } from "../hooks/use-team-navigation";
import InvitesTab from "./invites-tab";
import MembersTab from "./members-tab";

export type TeamSettingsProps = {
  workspaceId: string;
};

const TeamSettings = ({ workspaceId }: TeamSettingsProps) => {
  const { teamTab, setTeamTab } = useTeamNavigation("members");

  return (
    <div className="space-y-6">
      <div className="flex md:items-center md:justify-between flex-col md:flex-row gap-2">
        <div>
          <h2 className="text-lg font-semibold">Team</h2>
          <p className="text-sm text-muted-foreground">
            Teammates that have access to this workspace
          </p>
        </div>
        <div className="flex items-center gap-2">
          <WorkspaceInvite workspaceId={workspaceId} />
          <MemberInviteDialog workspaceId={workspaceId} />
        </div>
      </div>

      <Tabs value={teamTab} className="w-full">
        <TabsList className=" justify-start">
          <TabsTrigger value="members" onClick={() => setTeamTab("members")}>
            Members
          </TabsTrigger>
          <TabsTrigger
            value="invitations"
            onClick={() => setTeamTab("invitations")}
          >
            Invitations
          </TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="space-y-4 px-4">
          <MembersTab workspaceId={workspaceId} />
        </TabsContent>
        <TabsContent value="invitations" className="px-4">
          <InvitesTab workspaceId={workspaceId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export const TeamsLoading = () => <Skeleton className="h-28" />;

export default TeamSettings;
