import "server-only";

import { formatDate } from "@clikz/ui/lib/utils";

import { TINYBIRD_API_KEY, TINYBIRD_PIPES_ENDPOINT } from "~/lib/analytics";

import { RawAnalyticsData } from "../types";

export const getAnalytics = async (slug: string, interval: number) => {
  const date = new Date();

  // Subtract the number of days from the current date (range >7 and <180 days)
  date.setDate(date.getDate() - interval);

  const formattedDate = `${formatDate(date)}T${date.toTimeString().slice(0, 8)}`;

  const data = await fetch(
    `${TINYBIRD_PIPES_ENDPOINT}/clikz_click_events_pipe.json?workspaceSlug=${slug}&fromDate=${encodeURIComponent(formattedDate)}&token=${TINYBIRD_API_KEY}`
  )
    .then((res) => res.json())
    .then((res) => res.data);
  return data as RawAnalyticsData[] | undefined;
};
