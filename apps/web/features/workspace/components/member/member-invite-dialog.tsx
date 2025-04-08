import ResponsiveModel from "@clikz/ui/components/responsive-dialog";
import { Button } from "@clikz/ui/components/ui/button";

import MemberInviteForm from "./member-invite-form";

const MemberInviteDialog = () => {
  return (
    <ResponsiveModel
      trigger={<Button>Invite</Button>}
      className="p-6 rounded-lg"
      title="Invite Team Members"
    >
      <MemberInviteForm />
    </ResponsiveModel>
  );
};

export default MemberInviteDialog;
