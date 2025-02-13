"use client";

import { useState } from "react";

import { TabsList, TabsTrigger } from "@clikz/ui/components/ui/tabs";

type AnalyticsTabsProps = {
  tabs: {
    label: string;
    value: string;
  }[];
};
const AnalyticsTabs = ({ tabs }: AnalyticsTabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.value);

  return (
    <TabsList className="justify-start w-full px-4 my-2 border-b border-gray-400 rounded-none bg-background">
      {tabs.map((tab) => (
        <TabsTrigger
          key={`tab-${tab.value}`}
          value={tab.value}
          className="data-[state=active]:bg-background p-3 relative"
          onClick={() => setActiveTab(tab.value)}
        >
          {tab.label}
          {activeTab === tab.value && (
            <div
              className="absolute w-full text-black bottom-[2px]"
              style={{ transform: "none", transformOrigin: "50% 50% 0px" }}
            >
              <div className="h-0.5 rounded-t-full bg-current" />
            </div>
          )}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default AnalyticsTabs;
