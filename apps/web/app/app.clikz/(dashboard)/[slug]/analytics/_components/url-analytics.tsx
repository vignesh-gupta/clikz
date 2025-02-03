"use client";

import { TabsContent } from "@clikz/ui/components/ui/tabs";

import AnalyticsCard from "~/components/analytics/analytics-card";
import { MetricBarChart } from "~/components/analytics/metric-chart";
import LinkFavIcon from "~/features/link/components/link-fav-icon";
import { RawAnalyticsData } from "~/lib/types";
import { groupByParam } from "~/lib/utils/url";

type UrlAnalyticsProps = {
  data?: RawAnalyticsData[];
};

const UrlAnalytics = ({ data }: UrlAnalyticsProps) => {
  const groupByLinkId = groupByParam(data || [], "link_id");

  const analytics = groupByLinkId?.map((item) => ({
    icon: (
      <LinkFavIcon url={item.url} height={10} width={10} className="size-4" />
    ),
    short_url: item.short_url,
    url: item.url,
    linkId: item.link_id,
    clicks: item.amt,
  }));
  return (
    <AnalyticsCard
      tabs={[
        { label: "Short URL", value: "short-url" },
        { label: "Destination URL", value: "dest-url" },
      ]}
    >
      <TabsContent value="short-url">
        {!analytics || analytics?.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-60">
            No data available
          </div>
        ) : (
          <MetricBarChart
            items={analytics.map((data) => ({
              icon: data.icon,
              label: data.short_url,
              amt: data.clicks,
            }))}
            isLink
          />
        )}
      </TabsContent>
      <TabsContent value="dest-url">
        {!analytics || analytics?.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            No data available
          </div>
        ) : (
          <MetricBarChart
            items={analytics.map((data) => ({
              icon: data.icon,
              label: data.url,
              amt: data.clicks,
            }))}
            isLink
          />
        )}
      </TabsContent>
    </AnalyticsCard>
  );
};

export default UrlAnalytics;
