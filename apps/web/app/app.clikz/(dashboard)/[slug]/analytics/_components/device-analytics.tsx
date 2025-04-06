"use client";

import {
  MonitorIcon,
  MonitorSmartphoneIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react";

import { TabsContent } from "@clikz/ui/components/ui/tabs";
import { groupByParam } from "@clikz/utils/functions";

import AnalyticsCard from "~/components/analytics/analytics-card";
import { MetricBarChart } from "~/components/analytics/metric-chart";
import { BlurImage } from "~/components/blur-image";
import { AnalyticsDataProp } from "~/lib/types";

const DeviceAnalytics = ({ data }: AnalyticsDataProp) => {
  const groupByDevice = groupByParam(data, "device");
  const groupByBrowser = groupByParam(data, "browser");
  const groupByOS = groupByParam(data, "os");

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "desktop":
        return <MonitorIcon className="size-4" />;
      case "mobile":
        return <SmartphoneIcon className="size-4" />;
      case "tablet":
        return <TabletIcon className="size-4" />;
      default:
        return <MonitorSmartphoneIcon className="size-4" />;
    }
  };

  return (
    <AnalyticsCard
      tabs={[
        { label: "Device", value: "device" },
        { label: "Browser", value: "browser" },
        { label: "OS", value: "os" },
      ]}
    >
      <TabsContent value="device">
        <MetricBarChart
          barClassName="hover:border-green-600 hover:bg-green-300"
          filledBarClassName="bg-green-500"
          items={groupByDevice.map((data) => ({
            icon: getDeviceIcon(data.device),
            label: data.device || "Unknown",
            amt: data.amt,
          }))}
        />
      </TabsContent>
      <TabsContent value="browser">
        <MetricBarChart
          barClassName="hover:border-green-600 hover:bg-green-300"
          filledBarClassName="bg-green-500"
          items={groupByBrowser.map((data) => ({
            icon: (
              <BlurImage
                src={`https://faisalman.github.io/ua-parser-js/images/browsers/${data.browser.toLowerCase()}.png`}
                alt={data.os}
                height={10}
                width={10}
                className="size-4"
              />
            ),
            label: data.browser || "Unknown",
            amt: data.amt,
          }))}
        />
      </TabsContent>
      <TabsContent value="os">
        <MetricBarChart
          barClassName="hover:border-green-600 hover:bg-green-300"
          filledBarClassName="bg-green-500"
          items={groupByOS.map((data) => ({
            icon: (
              <BlurImage
                src={`https://faisalman.github.io/ua-parser-js/images/os/${data.os.toLowerCase()}.png`}
                alt={data.os}
                height={10}
                width={10}
                className="size-4"
              />
            ),
            label: data.os || "Unknown",
            amt: data.amt,
          }))}
        />
      </TabsContent>
    </AnalyticsCard>
  );
};

export default DeviceAnalytics;
