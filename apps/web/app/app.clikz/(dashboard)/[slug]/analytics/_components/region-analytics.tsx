import Image from "next/image";

import { Globe2Icon } from "lucide-react";

import { TabsContent } from "@clikz/ui/components/ui/tabs";
import { CONTINENTS, COUNTRIES, REGIONS } from "@clikz/utils/constants";
import { groupByParam } from "@clikz/utils/functions";

import AnalyticsCard from "~/components/analytics/analytics-card";
import { MetricBarChart } from "~/components/analytics/metric-chart";
import { AnalyticsDataProp } from "~/lib/types";

const RegionAnalytics = ({ data }: AnalyticsDataProp) => {
  const groupByCity = groupByParam(data, "city");
  const groupByRegion = groupByParam(data, "region");
  const groupByCountry = groupByParam(data, "country");
  const groupByContinent = groupByParam(data, "continent");

  return (
    <AnalyticsCard
      tabs={[
        { label: "City", value: "city" },
        { label: "Region", value: "region" },
        {
          label: "Country",
          value: "country",
        },
        { label: "Continent", value: "continent" },
      ]}
    >
      <TabsContent value="city">
        <MetricBarChart
          barClassName="hover:border-blue-600 hover:bg-blue-300"
          filledBarClassName="bg-blue-500"
          items={groupByCity.map((data) => ({
            icon: (
              <Image
                src={`https://flag.vercel.app/m/${data.country}.svg`}
                alt={`${data.country} flag`}
                height={10}
                width={10}
                className="size-4 object-contain"
              />
            ),
            label: data.city,
            amt: data.amt,
          }))}
        />
      </TabsContent>
      <TabsContent value="region">
        <MetricBarChart
          barClassName="hover:border-blue-600 hover:bg-blue-300"
          filledBarClassName="bg-blue-500"
          items={groupByRegion.map((data) => ({
            icon: (
              <Image
                src={`https://flag.vercel.app/m/${data.country}.svg`}
                alt={`${data.country} flag`}
                height={10}
                width={10}
                className="size-4 object-contain"
              />
            ),
            label:
              REGIONS[
                `${data.country}-${data.region}` as keyof typeof REGIONS
              ] ?? "Unknown",
            amt: data.amt,
          }))}
        />
      </TabsContent>
      <TabsContent value="country">
        <MetricBarChart
          barClassName="hover:border-blue-600 hover:bg-blue-300"
          filledBarClassName="bg-blue-500"
          items={groupByCountry.map((data) => ({
            icon: (
              <Image
                src={`https://flag.vercel.app/m/${data.country}.svg`}
                alt={`${data.country} flag`}
                height={10}
                width={10}
                className="size-4 object-contain"
              />
            ),
            label:
              COUNTRIES[data.country as keyof typeof COUNTRIES] ?? "Unknown",
            amt: data.amt,
          }))}
        />
      </TabsContent>
      <TabsContent value="continent">
        <MetricBarChart
          barClassName="hover:border-blue-600 hover:bg-blue-300"
          filledBarClassName="bg-blue-500"
          items={groupByContinent.map((data) => ({
            icon: <Globe2Icon className="size-4 " />,
            label:
              CONTINENTS[data.continent as keyof typeof CONTINENTS] ??
              "Unknown",
            amt: data.amt,
          }))}
        />
      </TabsContent>
    </AnalyticsCard>
  );
};

export default RegionAnalytics;
