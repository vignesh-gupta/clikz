import { Card } from "@clikz/ui/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@clikz/ui/components/ui/tabs";
import { cn } from "@clikz/ui/lib/utils";

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
        <TabsList className="justify-start w-full px-4 py-0 border-b rounded-none bg-background">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {children}
      </Tabs>
    </Card>
  );
};

export default AnalyticsCard;
