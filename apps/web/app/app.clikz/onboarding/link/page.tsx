import { LinkIcon } from "lucide-react";

import LaterButton from "~/app/app.clikz/onboarding/later-button";
import PageLayout from "../page-layout";
import CreateLinkForm from "./form";

const CreateLinkPage = () => {
  return (
    <PageLayout
      title="Create a link"
      subtitle="Create a link to share with your team"
      icon={
        <div className="p-2 bg-white rounded-full text-black">
          <LinkIcon className="size-6" />
        </div>
      }
    >
      <CreateLinkForm />
      <LaterButton />
    </PageLayout>
  );
};

export default CreateLinkPage;
