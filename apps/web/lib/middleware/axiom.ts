import { NextFetchEvent, NextRequest } from "next/server";

import { Logger } from "next-axiom";

export default function AxiomMiddleware(req: NextRequest, ev: NextFetchEvent) {
  const logger = new Logger({ source: "middleware" }); // traffic, request
  logger.middleware(req);
  ev.waitUntil(logger.flush());
}
