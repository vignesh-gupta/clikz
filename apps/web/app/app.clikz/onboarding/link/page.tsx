import { Suspense } from "react";

import { LinkIcon, Loader2 } from "lucide-react";

import LaterButton from "~/app/app.clikz/onboarding/later-button";

import PageLayout from "../page-layout";
import LinkForm from "./form";

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
      <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
        <LinkForm />
        <LaterButton />
      </Suspense>
    </PageLayout>
  );
};

export default CreateLinkPage;
