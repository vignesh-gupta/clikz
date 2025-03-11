import "server-only";

import { TINYBIRD_API_KEY, TINYBIRD_PIPES_ENDPOINT } from "~/lib/analytics";

import {
  GRANULARITY,
  INTERVAL_DATA,
  INTERVAL_TIMES,
} from "../constants/date-time";
import { RawAnalyticsData } from "../types";

// Either start and end dates are provided or interval is provided
// If start and end dates are provided, ignore interval
// If interval is provided, calculate start and end dates
// Return start and end dates with 00:00:00 time for Tinybird
const getStartAndEndDates = (
  interval: INTERVAL_TIMES,
  start?: string,
  end?: string
) => {
  let startDate: Date;
  let endDate: Date;
  let granularity: GRANULARITY = "day";

  if (!(start && end) && !interval) {
    throw new Error(
      "Either start and end dates should be provided or interval should be provided"
    );
  }

  if (start && end) {
    startDate = new Date(start);
    endDate = new Date(end);

    const diff = Math.abs(startDate.getTime() - endDate.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (diffDays <= 1) {
      granularity = "hour";
    } else if (diffDays >= 180) {
      granularity = "month";
    }
  } else {
    startDate = INTERVAL_DATA[interval].startDate;
    endDate = new Date();
  }

  return {
    startDate: startDate.toISOString().replace("T", " ").slice(0, 19),
    endDate: endDate.toISOString().replace("T", " ").slice(0, 19),
    granularity,
  };
};

export const getAnalytics = async (
  slug: string,
  interval: INTERVAL_TIMES = "7d",
  start?: string,
  end?: string
) => {
  const { endDate, startDate } = getStartAndEndDates(interval, start, end);
  const url = `${TINYBIRD_PIPES_ENDPOINT}/clikz_click_events_pipe.json?workspaceSlug=${slug}&fromDate=${encodeURIComponent(startDate)}&toDate=${encodeURIComponent(endDate)}&token=${TINYBIRD_API_KEY}`;

  console.log("Fetching analytics data from Tinybird", {
    url,
    startDate,
    endDate,
  });

  const data = await fetch(url)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.error("Failed to fetch", { err }));
  return data as RawAnalyticsData[] | undefined;
};
