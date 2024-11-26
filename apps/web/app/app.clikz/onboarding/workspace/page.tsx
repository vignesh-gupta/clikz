import WorkspaceForm from "~/components/onboarding/workspace-form";
import PageLayout from "../page-layout";
import { BriefcaseIcon } from "lucide-react";

const OnboardingWorkspacePage = () => {
  return (
    <PageLayout
      title="Create your workspace"
      subtitle="Start collaborating with your team in minutes"
      icon={
        <div className="p-2 bg-white rounded-full text-black">
          <BriefcaseIcon className="size-6" />
        </div>
      }
    >
      <WorkspaceForm />
    </PageLayout>
  );
};

export default OnboardingWorkspacePage;
