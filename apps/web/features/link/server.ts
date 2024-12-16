import { Hono } from "hono";

import { db } from "~/lib/db";

const linkApp = new Hono().get("/:slug/exist", async (c) => {
  const slug = c.req.param("slug");
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const domain = c.req.query("domain") ?? process.env.NEXT_PUBLIC_APP_DOMAIN;

  const link = await db.link.count({
    where: {
      key: slug,
      domain,
    },
  });

  return c.json({ exists: link > 0 });
});

export default linkApp;
