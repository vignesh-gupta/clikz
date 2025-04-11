import { TabsContent } from "@clikz/ui/components/ui/tabs";
import { APP_DOMAIN } from "@clikz/utils/constants";

import AnalyticsCard from "~/components/analytics/analytics-card";
import { AnalyticsDataProp } from "~/types/pages.types";

import ReferrerAnalytics from "./referrer-analytics";

const CampaignAnalytics = ({ data }: AnalyticsDataProp) => {
  const referrerData =
    data?.map((item) => ({
      ...item,
      referer: APP_DOMAIN.includes(item.referer) ? "(direct)" : item.referer,
      referer_url: APP_DOMAIN.includes(item.referer_url)
        ? "(direct)"
        : item.referer_url,
    })) || [];
  return (
    <AnalyticsCard
      tabs={[
        { label: "Referrer", value: "referrer" },
        { label: "UTM Parameter", value: "utm" },
      ]}
    >
      <TabsContent value="referrer">
        <ReferrerAnalytics data={referrerData} />
      </TabsContent>
    </AnalyticsCard>
  );
};

export default CampaignAnalytics;
