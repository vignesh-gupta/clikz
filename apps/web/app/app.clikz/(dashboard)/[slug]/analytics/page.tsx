import { LinkIcon, UsersIcon } from "lucide-react";

import { Card } from "@clikz/ui/components/ui/card";

import PageTitle from "~/components/page-title";
import { getAnalytics } from "~/lib/analytics/fetch-analytics";
import { groupByParam } from "~/lib/utils/url";

import { PageWithSlugParams } from "../page";
import CampaignAnalytics from "./_components/campaign-analytics";
import DeviceAnalytics from "./_components/device-analytics";
import PageFilters from "./_components/page-filters";
import RegionAnalytics from "./_components/region-analytics";
import UrlAnalytics from "./_components/url-analytics";

const AnalyticsPage = async ({ params }: PageWithSlugParams) => {
  const { slug } = await params;
  const data = await getAnalytics(slug, "7d");

  // Calculate total clicks and other metrics
  const totalLinks = groupByParam(data ?? [], "link_id").length;
  const totalClicks = data?.reduce((sum) => sum + 1, 0) || 0;

  return (
    <div className="space-y-6">
      <PageTitle title="Analytics" />
      <PageFilters />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Links</p>
              <p className="text-2xl font-bold">{totalLinks}</p>
            </div>
            <LinkIcon className="text-blue-500 size-8" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Visitors</p>
              <p className="text-2xl font-bold">{totalClicks}</p>
            </div>
            <UsersIcon className="text-green-500 size-8" />
          </div>
        </Card>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <UrlAnalytics data={data} />
        <RegionAnalytics data={data} />
        <DeviceAnalytics data={data} />
        <CampaignAnalytics data={data} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
