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

type ClickAnalyticsProps = {
  data: RawAnalyticsData[];
};

const ClickAnalytics = ({ data }: ClickAnalyticsProps) => {
  const analytics = data.map((item) => ({
     icon: <LinkFavIcon url={item.url} />,
      label: item.;
      amt: number;
  }));
  return (
    <Card className="h-full">
      <Tabs defaultValue="short-url">
        <CardHeader>
          <TabsList>
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
            <MetricBarChart items={analytics} />
          </TabsContent>
          <TabsContent value="dest-url">Destination URL</TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default ClickAnalytics;
