import { NextFetchEvent, NextRequest } from "next/server";

import { Logger } from "next-axiom";

import { env } from "../env";

export default function AxiomMiddleware(req: NextRequest, ev: NextFetchEvent) {
  if (env.NODE_ENV === "development") return;
  const logger = new Logger({ source: "middleware" }); // traffic, request
  logger.middleware(req);
  ev.waitUntil(logger.flush());
}
