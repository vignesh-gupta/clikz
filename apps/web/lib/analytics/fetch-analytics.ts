import "server-only";

import { TINYBIRD_API_KEY, TINYBIRD_PIPES_ENDPOINT } from "~/lib/analytics";

import { RawAnalyticsData } from "../types";

export const getAnalytics = async (slug: string, internal: number) => {
  const date = new Date();

  // Subtract the number of days from the current date (range >7 and <180 days)
  date.setDate(date.getDate() - internal);

  const formattedDate = `${date.getFullYear()}-${date.getMonth() < 10 ? "0" : ""}${date.getMonth() + 1}-${date.getDate() < 10 ? "0" : ""}${date.getDate()}T${date.toTimeString().slice(0, 8)}`;

  const data = await fetch(
    `${TINYBIRD_PIPES_ENDPOINT}/clikz_click_events_pipe.json?workspaceSlug=${slug}&fromDate=${encodeURIComponent(formattedDate)}&token=${TINYBIRD_API_KEY}`
  )
    .then((res) => res.json())
    .then((res) => res.data);
  return data as RawAnalyticsData[] | undefined;
};
