import { Card } from "@clikz/ui/components/ui/card";
import { Tabs } from "@clikz/ui/components/ui/tabs";
import { cn } from "@clikz/ui/lib/utils";

import AnalyticsTabs from "./analytics-tabs";

type AnalyticsCardProps = {
  tabs: {
    label: string;
    value: string;
  }[];
  children: React.ReactNode;
  className?: string;
};
const AnalyticsCard = ({ tabs, children, className }: AnalyticsCardProps) => {
  return (
    <Card className={cn("h-full min-h-96", className)}>
      <Tabs defaultValue={tabs[0]?.value}>
        <AnalyticsTabs tabs={tabs} />
        {children}
      </Tabs>
    </Card>
  );
};

export default AnalyticsCard;
