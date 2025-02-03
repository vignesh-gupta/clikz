import { Card } from "@clikz/ui/components/ui/card";
import { Tabs } from "@clikz/ui/components/ui/tabs";

import AnalyticsTabs from "./analytics-tabs";

type AnalyticsCardProps = {
  tabs: {
    label: string;
    value: string;
  }[];
  children: React.ReactNode;
};
const AnalyticsCard = ({ tabs, children }: AnalyticsCardProps) => {
  return (
    <Card className="h-full shadow-lg min-h-96">
      <Tabs defaultValue="short-url">
        <AnalyticsTabs tabs={tabs} />
        {children}
      </Tabs>
    </Card>
  );
};

export default AnalyticsCard;
