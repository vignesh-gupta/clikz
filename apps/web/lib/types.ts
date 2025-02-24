import { Link } from "@prisma/client";

import { Continent } from "./constants/continents";
import { CountryCode } from "./constants/countries";

export type WorkspaceMember = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: "ADMIN" | "MEMBER";
};

export type PageWorkspaceIdProps = {
  workspaceId: string;
};

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

export type AnalyticsDataProp = {
  data?: RawAnalyticsData[];
};

export type RequiredLinkProp = Pick<
  Link,
  "id" | "key" | "url" | "domain" | "workspaceId" | "workspaceSlug"
>;
