import { Hono } from "hono";
import { handle } from "hono/vercel";

import linksApp from "~/features/link/server";
import workspacesApp from "~/features/workspace/server";

export const runtime = "nodejs";

const app = new Hono()
  .basePath("/api")
  .route("/workspaces", workspacesApp)
  .route("/links", linksApp);

export type AppType = typeof app;

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PUT = handle(app);
