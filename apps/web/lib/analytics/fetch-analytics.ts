import "server-only";

import { TINYBIRD_API_KET, TINYBIRD_PIPES_ENDPOINT } from "~/lib/analytics";

import { RawAnalyticsData } from "../types";

export const getAnalytics = async (slug: string) => {
  const data = await fetch(
    `${TINYBIRD_PIPES_ENDPOINT}/clikz_click_events_pipe.json?workspaceSlug=${slug}&token=${TINYBIRD_API_KET}`
  )
    .then((res) => res.json())
    .then((res) => res.data);
  return data as RawAnalyticsData[];
};
