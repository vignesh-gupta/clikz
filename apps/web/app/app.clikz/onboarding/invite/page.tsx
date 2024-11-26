import React from "react";
import PageLayout from "../page-layout";
import { UsersIcon } from "lucide-react";
import { InviteTeamForm } from "~/components/onboarding/invite-team-form";
import LaterButton from "~/components/onboarding/later-button";

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
