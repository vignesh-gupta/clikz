import "server-only";

import { formatDate } from "@clikz/ui/lib/utils";

import { TINYBIRD_API_KEY, TINYBIRD_PIPES_ENDPOINT } from "~/lib/analytics";

import { RawAnalyticsData } from "../types";

export const getAnalytics = async (
  slug: string,
  interval: number = 7,
  start?: string,
  end?: string
) => {
  const endDate = end ? new Date(end) : new Date();
  const startDate = start
    ? new Date(start)
    : new Date(endDate.getTime() - interval * 24 * 60 * 60 * 1000);

  const formattedStartDate = `${formatDate(startDate)}T${startDate.toTimeString().slice(0, 8)}`;
  const formattedEndDate = `${formatDate(endDate)}T${endDate.toTimeString().slice(0, 8)}`;

  const url = `${TINYBIRD_PIPES_ENDPOINT}/clikz_click_events_pipe.json?workspaceSlug=${slug}&fromDate=${encodeURIComponent(formattedStartDate)}&toDate=${encodeURIComponent(formattedEndDate)}&token=${TINYBIRD_API_KEY}`;

  const data = await fetch(url)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.error("Failed to fetch", { err }));
  return data as RawAnalyticsData[] | undefined;
};
