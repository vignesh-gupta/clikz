import { UsersIcon } from "lucide-react";

import LaterButton from "../later-button";
import PageLayout from "../page-layout";
import { InviteTeamForm } from "./form";

const InvitePage = () => {
  return (
    <PageLayout
      title="Create your workspace"
      subtitle="Start collaborating with your team in minutes"
      icon={
        <div className="p-2 bg-white rounded-full text-black">
          <UsersIcon className="size-6" />
        </div>
      }
    >
      <InviteTeamForm />
      <LaterButton />
    </PageLayout>
  );
};

export default InvitePage;
