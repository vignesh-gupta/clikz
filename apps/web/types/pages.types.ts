import { RawAnalyticsData } from "./analytics.types";

export type AnalyticsDataProp = {
  data?: RawAnalyticsData[];
};

export type PageWithSlugParams = {
  params: Promise<{ slug: string }>;
};
