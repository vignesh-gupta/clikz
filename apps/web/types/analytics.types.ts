import { Continent, CountryCode } from "@clikz/utils/constants";

export type RawAnalyticsData = {
  timestamp: string;
  link_id: string;
  url: string;
  short_url: string;
  workspace_id: string;
  workspace_slug: string;
  city: string;
  region: string;
  country: CountryCode;
  continent: Continent;
  browser: string;
  os: string;
  device: string;
  referer: string;
  referer_url: string;
  qr: 0 | 1;
};
