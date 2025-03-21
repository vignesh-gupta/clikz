import ResponsiveModel from "@clikz/ui/components/responsive-dialog";
import { Button } from "@clikz/ui/components/ui/button";

import MemberInviteForm from "./member-invite-form";

const MemberInviteDialog = () => {
  return (
    <ResponsiveModel
      trigger={<Button>Invite</Button>}
      className="p-6 rounded-lg"
    >
      <h3 className="text-lg font-semibold">Invite Team Members</h3>
      <MemberInviteForm />
    </ResponsiveModel>
  );
};

export default MemberInviteDialog;
