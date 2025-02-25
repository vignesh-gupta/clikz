import { MailIcon, RotateCcwIcon, Trash2Icon } from "lucide-react";

import { TooltipButton } from "@clikz/ui/components/tooltip-button";
import { Button } from "@clikz/ui/components/ui/button";
import { capitalizeFirstLetter } from "@clikz/ui/lib/utils";

import { useDeleteInvite } from "~/features/workspace/api/invite/use-delete-invite";
import { useGetInvites } from "~/features/workspace/api/invite/use-get-invites";
import { useResendInvite } from "~/features/workspace/api/invite/use-resend-invite";
import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";

import { TeamsLoading } from "./team-settings";

const InvitesTab = () => {
  const slug = useWorkspaceSlug();
  const { data: invites, isLoading } = useGetInvites({ idOrSlug: slug });
  const { mutate: deleteInvite } = useDeleteInvite();
  const { mutate: resendInvite } = useResendInvite();

  if (isLoading) return <TeamsLoading />;

  if (!invites?.length)
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        No pending invitations
      </div>
    );

  const onDeleteInvite = async (inviteId: string) => {
    deleteInvite({ param: { idOrSlug: slug, inviteId } });
  };

  const onResendInvite = async (inviteId: string) => {
    resendInvite({ param: { idOrSlug: slug, inviteId } });
  };

  return (
    <div className="flex flex-col items-center px-4 gap-y-4">
      {invites.map((invite) => (
        <div
          key={invite.id}
          className="flex items-center justify-between w-full py-4"
        >
          <div className="flex items-center gap-4">
            <div className="p-1 text-white bg-gray-700 rounded-full size-8">
              <MailIcon className="object-contain" />
            </div>
            <div>
              <p className="text-sm font-medium">{invite.email}</p>
              <p className="text-xs text-muted-foreground">
                Expires {new Date(invite.expires).toLocaleDateString()} •{" "}
                {capitalizeFirstLetter(invite.role)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TooltipButton text="Resend invite">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onResendInvite(invite.id)}
              >
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
      ))}
    </div>
  );
};

export default InvitesTab;
