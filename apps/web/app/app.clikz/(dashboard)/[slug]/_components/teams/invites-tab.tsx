import { MailIcon, RotateCcwIcon, Trash2Icon } from "lucide-react";

import { TooltipButton } from "@clikz/ui/components/tooltip-button";
import { Button } from "@clikz/ui/components/ui/button";
import { capitalizeFirstLetter } from "@clikz/ui/lib/utils";

import { useDeleteInvite } from "~/features/workspace/api/invite/use-delete-invite";
import { useGetWorkspaceInvites } from "~/features/workspace/api/invite/use-get-workspace-invites";

import { TeamSettingsProps, TeamsLoading } from "./team-settings";

const InvitesTab = ({ workspaceId }: TeamSettingsProps) => {
  const { data: invites, isLoading } = useGetWorkspaceInvites({ workspaceId });
  const { mutate: deleteInvite } = useDeleteInvite();

  if (isLoading) return <TeamsLoading />;

  if (!invites?.length)
    return (
      <div className="text-sm text-muted-foreground py-4">
        No pending invitations
      </div>
    );

  const onDeleteInvite = async (inviteId: string) => {
    deleteInvite({ param: { workspaceId, inviteId } });
  };

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
        <TooltipButton text="Resend invite">
          <Button variant="outline" size="icon">
            <RotateCcwIcon />
          </Button>
        </TooltipButton>

        <TooltipButton
          text="Delete invite"
          className="bg-destructive text-destructive-foreground"
        >
          <Button
            variant="outline"
            className="hover:bg-destructive hover:text-destructive-foreground border-destructive/40 text-destructive/80"
            size="icon"
            onClick={() => onDeleteInvite(invite.id)}
          >
            <Trash2Icon />
          </Button>
        </TooltipButton>
      </div>
    </div>
  ));
};

export default InvitesTab;
