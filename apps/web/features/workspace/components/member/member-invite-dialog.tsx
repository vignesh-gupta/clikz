import ResponsiveModel from "@clikz/ui/components/responsive-dialog";
import { Button } from "@clikz/ui/components/ui/button";

import { InviteTeamForm } from "~/app/app.clikz/onboarding/invite/form";

const MemberInviteDialog = () => {
  return (
    <ResponsiveModel
      trigger={<Button>Invite</Button>}
      className="p-6 rounded-lg"
    >
      <h3 className="text-lg font-semibold">Invite Team Members</h3>
      <InviteTeamForm />
    </ResponsiveModel>
  );
};

export default MemberInviteDialog;
