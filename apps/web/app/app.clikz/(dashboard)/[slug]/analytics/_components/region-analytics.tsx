import Image from "next/image";

import { Globe2Icon } from "lucide-react";

import { TabsContent } from "@clikz/ui/components/ui/tabs";

import AnalyticsCard from "~/components/analytics/analytics-card";
import { MetricBarChart } from "~/components/analytics/metric-chart";
import { CONTINENTS } from "~/lib/constants/continents";
import { COUNTRIES } from "~/lib/constants/countries";
import { REGIONS } from "~/lib/constants/region";
import { RawAnalyticsData } from "~/lib/types";
import { groupByParam } from "~/lib/utils/url";

type RegionAnalyticsProps = {
  data?: RawAnalyticsData[];
};

const RegionAnalytics = ({ data }: RegionAnalyticsProps) => {
  const groupByCity = groupByParam(data || [], "city");
  const groupByRegion = groupByParam(data || [], "region");
  const groupByCountry = groupByParam(data || [], "country");
  const groupByContinent = groupByParam(data || [], "continent");

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
          color="red"
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
          color="red"
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
          color="red"
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
            label: COUNTRIES[data.country] ?? "Unknown",
            amt: data.amt,
          }))}
        />
      </TabsContent>
      <TabsContent value="continent">
        <MetricBarChart
          color="red"
          items={groupByContinent.map((data) => ({
            icon: <Globe2Icon className="size-4 " />,
            label: CONTINENTS[data.continent] ?? "Unknown",
            amt: data.amt,
          }))}
        />
      </TabsContent>
    </AnalyticsCard>
  );
};

export default RegionAnalytics;
