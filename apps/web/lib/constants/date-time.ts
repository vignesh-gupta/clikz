export type INTERVAL_TIMES = "24h" | "7d" | "30d" | "90d" | "1y";
export type GRANULARITY = "minute" | "hour" | "day" | "month";

export const INTERVAL_DATA: Record<
  INTERVAL_TIMES,
  {
    startDate: Date;
    granularity: GRANULARITY;
  }
> = {
  "24h": {
    startDate: new Date(Date.now() - 86400000),
    granularity: "hour",
  },
  "7d": {
    startDate: new Date(Date.now() - 604800000),
    granularity: "day",
  },
  "30d": {
    startDate: new Date(Date.now() - 2592000000),
    granularity: "day",
  },
  "90d": {
    startDate: new Date(Date.now() - 7776000000),
    granularity: "day",
  },
  "1y": {
    startDate: new Date(Date.now() - 31556952000),
    granularity: "month",
  },
};
