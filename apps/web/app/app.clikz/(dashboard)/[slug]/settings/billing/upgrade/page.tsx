"use client";

import PricingSection from "~/app/(public)/_components/pricing-section";
import { useGetWorkspace } from "~/features/workspace/api/workspace/use-get-workspace";
import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";

const PriceChangePage = () => {
  const slug = useWorkspaceSlug();
  const { data: workspace } = useGetWorkspace({
    idOrSlug: slug,
  });

  return <PricingSection currentPlan={workspace?.plan} isPricingPage />;
};

export default PriceChangePage;
