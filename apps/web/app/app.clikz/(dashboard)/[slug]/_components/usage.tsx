"use client";

import Link from "next/link";

import { LinkIcon, MousePointerClickIcon } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";
import { Progress } from "@clikz/ui/components/ui/progress";
import { STRIPE_BILLING_URL } from "@clikz/utils/constants";

import { useGetWorkspace } from "~/features/workspace/api/workspace/use-get-workspace";
import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";

const WorkspaceUsage = () => {
  const workspaceSlug = useWorkspaceSlug();

  const { data } = useGetWorkspace({
    idOrSlug: workspaceSlug,
  });

  const linkUsedPercentage = data?.totalLinks
    ? (data.totalLinks / (data.linksLimit || 25)) * 100
    : 0;

  const clickUsedPercentage = data?.totalClicks
    ? (data.totalClicks / (data.clicksLimit || 1000)) * 100
    : 0;

  return (
    <div className="space-y-4 px-4">
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center">
              <LinkIcon className="mr-1 size-3" />
              Links
            </span>
            <span>
              {data?.totalLinks || 0} of {data?.linksLimit || 25}
            </span>
          </div>
          <Progress value={linkUsedPercentage} className="h-1" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center">
              <MousePointerClickIcon className="mr-1 size-4" />
              Clicks
            </span>
            <span>
              {data?.totalClicks || 0} of {data?.clicksLimit || 25}
            </span>
          </div>
          <Progress value={clickUsedPercentage} className="h-1" />
        </div>
      </div>
      <Button className="w-full" size="sm" asChild>
        <Link target="_blank" href={STRIPE_BILLING_URL}>
          Upgrade
        </Link>
      </Button>
    </div>
  );
};

export default WorkspaceUsage;
