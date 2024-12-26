import Link from "next/link";

import { ArrowRight, SparklesIcon } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";

import { NEW_LINK_QUERY_PARAM } from "~/features/link/hooks/use-create-link-modal";

import PageLayout from "../page-layout";

type OnboardingCompletedPageProps = {
  searchParams: Promise<{ workspaceId: string }>;
};

const OnboardingCompletedPage = async ({
  searchParams,
}: OnboardingCompletedPageProps) => {
  const { workspaceId } = await searchParams;

  return (
    <PageLayout
      title="Completed"
      subtitle="You are all set now!"
      icon={
        <div className="p-2 bg-white rounded-full text-black">
          <SparklesIcon className="size-6" />
        </div>
      }
    >
      <Link
        href={`/${workspaceId || "dashboard"}?${NEW_LINK_QUERY_PARAM}=true`}
        className="flex items-center justify-center"
      >
        <Button className="flex-1 group">
          Go to workspace
          <ArrowRight className="group-hover:translate-x-2 transition" />
        </Button>
      </Link>
    </PageLayout>
  );
};

export default OnboardingCompletedPage;
