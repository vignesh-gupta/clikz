"use client";

import { Skeleton } from "@clikz/ui/components/ui/skeleton";

import PricingSection from "~/app/(public)/_components/pricing-section";
import { useGetWorkspace } from "~/features/workspace/api/workspace/use-get-workspace";
import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";

const PriceChangePage = () => {
  const slug = useWorkspaceSlug();
  const { data: workspace, isLoading } = useGetWorkspace({
    idOrSlug: slug,
  });

  if (isLoading) {
    return <Skeleton className="h-[700px] w-full mt-16" />;
  }

  return <PricingSection currentPlan={workspace?.plan} isPricingPage />;
};

export default PriceChangePage;
