import { NextFetchEvent, NextRequest } from "next/server";

import { Logger } from "next-axiom";

import { sharedEnv } from "../env/shared";

export default function AxiomMiddleware(req: NextRequest, ev: NextFetchEvent) {
  if (sharedEnv.NODE_ENV === "development") return;
  const logger = new Logger({ source: "middleware" }); // traffic, request
  logger.middleware(req);
  ev.waitUntil(logger.flush());
}
