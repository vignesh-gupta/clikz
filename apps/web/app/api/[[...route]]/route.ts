import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

import linkApp from "~/features/link/server";
import workspacesApp from "~/features/workspace/server";

export const runtime = "nodejs";

const app = new Hono()
  .use(
    "/api",
    cors({
      origin: "https://app.clikz.live",
    })
  )
  .basePath("/api")
  .route("/workspaces", workspacesApp)
  .route("/links", linkApp);

export type AppType = typeof app;

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
