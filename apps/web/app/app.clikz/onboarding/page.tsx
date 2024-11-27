import { Button } from "@repo/ui/components/ui/button";
import { ArrowRight, FlameIcon } from "lucide-react";
import PageLayout from "./page-layout";
import Link from "next/link";

const OnboardingPage = () => {
  return (
    <PageLayout
      title="Welcome to Clikz"
      subtitle="Let's get you started with your workspace"
      icon={
        <div className="p-2 bg-white rounded-full text-black">
          <FlameIcon className="size-6" />
        </div>
      }
    >
      <Link href="onboarding/workspace" className="flex items-center justify-center">
        <Button className="flex-1 group">
          Get started
          <ArrowRight className="group-hover:translate-x-2 transition" />
        </Button>
      </Link>
    </PageLayout>
  );
};

export default OnboardingPage;
