import { LinkIcon } from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@clikz/ui/components/ui/tabs";
import { APP_DOMAIN } from "@clikz/utils/constants";
import { groupByParam } from "@clikz/utils/functions";

import { MetricBarChart } from "~/components/analytics/metric-chart";
import LinkFavIcon from "~/features/link/components/link-fav-icon";
import { AnalyticsDataProp } from "~/types/pages.types";

const ReferrerAnalytics = ({ data }: AnalyticsDataProp) => {
  const groupByReferrer = groupByParam(data, "referer")?.map((item) => ({
    icon:
      item.referer === "(direct)" || item.referer === APP_DOMAIN ? (
        <LinkIcon className="size-4" />
      ) : (
        <LinkFavIcon
          url={item.referer_url}
          height={10}
          width={10}
          className="p-0 bg-transparent size-4"
        />
      ),
    domain: item.referer,
    url: item.referer_url,
    linkId: item.link_id,
    clicks: item.amt,
  }));

  return (
    <Tabs className="-mt-4" defaultValue="domain">
      <TabsList className="justify-start w-full px-4 border-b border-gray-300 rounded-none bg-background">
        <TabsTrigger className="px-2 py-1 text-xs" value="domain">
          Domain
        </TabsTrigger>
        <TabsTrigger className="px-2 py-1 text-xs" value="url">
          URL
        </TabsTrigger>
      </TabsList>
      <TabsContent value="domain">
        <MetricBarChart
          barClassName="hover:border-red-600 hover:bg-red-300"
          filledBarClassName="bg-red-500"
          items={groupByReferrer.map((data) => ({
            icon: data.icon,
            label: data.domain,
            amt: data.clicks,
          }))}
        />
      </TabsContent>
      <TabsContent value="url">
        <MetricBarChart
          barClassName="hover:border-red-600 hover:bg-red-300"
          filledBarClassName="bg-red-500"
          items={groupByReferrer.map((data) => ({
            icon: data.icon,
            label: data.url,
            amt: data.clicks,
          }))}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ReferrerAnalytics;
