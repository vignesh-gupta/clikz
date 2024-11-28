import { Button } from "@clikz/ui/components/ui/button";
import { ArrowRight, SparklesIcon } from "lucide-react";
import Link from "next/link";
import PageLayout from "../page-layout";

const OnboardingCompletedPage = () => {
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
        href="/dashboard"
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
