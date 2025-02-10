import {
  ArrowUpIcon,
  MousePointerClickIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";

import { DateRangePicker } from "@clikz/ui/components/date-range-picker";
import { Card } from "@clikz/ui/components/ui/card";

import RegionAnalytics from "~/app/app.clikz/(dashboard)/[slug]/analytics/_components/region-analytics";
import UrlAnalytics from "~/app/app.clikz/(dashboard)/[slug]/analytics/_components/url-analytics";
import { getAnalytics } from "~/lib/analytics/fetch-analytics";

import { PageWithSlugParams } from "../page";
import DeviceAnalytics from "./_components/device-analytics";

const AnalyticsPage = async ({ params }: PageWithSlugParams) => {
  const { slug } = await params;
  const data = await getAnalytics(slug, 7);

  // Calculate total clicks and other metrics
  const totalClicks = data?.reduce((sum) => sum + 1, 0) || 0;
  const uniqueVisitors = 100;
  const clickGrowth = 12; // Calculate growth percentage compared to previous period

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold leading-7 text-neutral-900 md:text-2xl">
          Analytics
        </h1>
        <DateRangePicker />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Clicks</p>
              <p className="text-2xl font-bold">{totalClicks}</p>
            </div>
            <MousePointerClickIcon className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Unique Visitors</p>
              <p className="text-2xl font-bold">{uniqueVisitors}</p>
            </div>
            <UsersIcon className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Click Growth</p>
              <div className="flex items-center gap-1">
                <p className="text-2xl font-bold">{clickGrowth}%</p>
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              </div>
            </div>
            <TrendingUpIcon className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <UrlAnalytics data={data} />
          <DeviceAnalytics data={data} />
        </div>
        <div className="space-y-6">
          <RegionAnalytics data={data} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
