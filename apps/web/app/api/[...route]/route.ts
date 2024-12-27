import { Hono } from "hono";
import { handle } from "hono/vercel";

import linkApp from "~/features/link/server";
import workspaceApp from "~/features/workspace/server";

export const runtime = "edge";

const app = new Hono()
  .basePath("/api")
  .route("/workspaces", workspaceApp)
  .route("/links", linkApp);

app.get("/metadata", async (c) => {
  const url = c.req.query("url");

  if (!url) {
    console.error("[METADATA_API] Invalid URL");
    return c.json(
      {
        error: "Please provide a URL",
      },
      { status: 400 }
    );
  }

  const res = await fetch(`https://api.microlink.io/?url=${url}`).then((res) =>
    res.json()
  );

  if (res.status === "error" && !res.data && res.statusCode !== 200) {
    console.error("[METADATA_API] Failed to fetch metadata");
    return c.json({
      error: "Failed to fetch metadata",
    });
  }

  return c.json({
    title: res.data.title,
    description: res.data.description,
    image: res.data.image.url,
    favicon: res.data.logo.url,
  });
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
