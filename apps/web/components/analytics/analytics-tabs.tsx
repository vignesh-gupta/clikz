import { TabsList, TabsTrigger } from "@clikz/ui/components/ui/tabs";

type AnalyticsTabsProps = {
  tabs: {
    label: string;
    value: string;
  }[];
};
const AnalyticsTabs = ({ tabs }: AnalyticsTabsProps) => {
  return (
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
  );
};

export default AnalyticsTabs;
