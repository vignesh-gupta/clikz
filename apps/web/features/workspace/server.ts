import { Hono } from "hono";

import { db } from "~/lib/db";

const workspacesApp = new Hono()
  .get("/:slug/exist", async (c) => {
  const slug = c.req.param("slug");

  const workspace = await db.workspace.count({
    where: {
      slug,
    },
  });

  return c.json({ exists: workspace > 0 });
});

export default workspacesApp;
