import { Card, CardContent, CardHeader } from "@clikz/ui/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@clikz/ui/components/ui/tabs";

import { MetricBarChart } from "~/app/app.clikz/(dashboard)/[slug]/analytics/metric-chart";
import LinkFavIcon from "~/features/link/components/link-fav-icon";
import { RawAnalyticsData } from "~/lib/types";
import { groupByLink } from "~/lib/utils/url";

type ClickAnalyticsProps = {
  data?: RawAnalyticsData[];
};

const ClickAnalytics = ({ data }: ClickAnalyticsProps) => {
  const groupByLinkId = groupByLink(data || []);

  const analytics = groupByLinkId?.map((item) => ({
    icon: (
      <LinkFavIcon url={item.url} height={10} width={10} className="size-4" />
    ),
    short_url: item.short_url,
    url: item.url,
    linkId: item.linkId,
    clicks: item.amt,
  }));
  return (
    <Card className="h-full min-h-60 shadow-xl">
      <Tabs defaultValue="short-url">
        <CardHeader>
          <TabsList className="justify-start">
            <TabsTrigger
              value="short-url"
              // className="data-[state=active]:bg-transparent data-[state=active]:text-primary"
            >
              Short URL
            </TabsTrigger>
            <TabsTrigger
              value="dest-url"
              // className="data-[state=active]:bg-transparent data-[state=active]:text-primary"
            >
              Destination URL
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          <TabsContent value="short-url">
            {!analytics || analytics?.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                No data available
              </div>
            ) : (
              <MetricBarChart
                items={analytics.map((data) => ({
                  icon: data.icon,
                  label: data.short_url,
                  amt: data.clicks,
                }))}
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
              />
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default ClickAnalytics;
