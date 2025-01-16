import { MailIcon } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";
import { capitalizeFirstLetter } from "@clikz/ui/lib/utils";

import { useGetWorkspaceInvites } from "~/features/workspace/api/invite/use-get-workspace-invites";

import { TeamSettingsProps, TeamsLoading } from "./team-settings";

const InvitesTab = ({ workspaceId }: TeamSettingsProps) => {
  const { data: invites, isLoading } = useGetWorkspaceInvites({ workspaceId });

  if (isLoading) return <TeamsLoading />;

  if (!invites?.length)
    return (
      <div className="text-sm text-muted-foreground py-4">
        No pending invitations
      </div>
    );

  return invites.map((invite) => (
    <div key={invite.id} className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <MailIcon className="size-10 p-2 bg-gray-700 rounded-full text-white" />
        <div>
          <p className="font-medium">{invite.email}</p>
          <p className="text-sm text-muted-foreground">
            Invited {new Date(invite.expires).toLocaleDateString()} •{" "}
            {capitalizeFirstLetter(invite.role)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          Revoke
        </Button>
        <Button variant="ghost" size="sm">
          Resend
        </Button>
      </div>
    </div>
  ));
};

export default InvitesTab;
