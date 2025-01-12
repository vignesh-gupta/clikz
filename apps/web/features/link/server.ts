import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { BASE_DOMAIN } from "~/lib/constants";
import { db } from "~/lib/db";

import { getWorkspaceLinks } from "./data";
import { getLinkSchema } from "./schema";

const linksApp = new Hono()
  .get("/", zValidator("query", getLinkSchema), async (c) => {
    const { slug } = c.req.valid("query");

    const link = await getWorkspaceLinks(slug);

    if (!link) {
      return c.json({ error: "Link not found" }, 404);
    }

    return c.json({ link });
  })
  .get("/:linkId", async (c) => {
    const linkId = c.req.param("linkId");

    if (linkId === "new") {
      return c.json({ link: null });
    }

    const link = await db.link.findUnique({
      where: { id: linkId },
    });

    if (!link) {
      return c.json({ error: "Link not found" }, 404);
    }

    return c.json({ link });
  })
  .get("/:slug/exist", async (c) => {
    const slug = c.req.param("slug");
    const domain = c.req.query("domain") ?? BASE_DOMAIN;

    const link = await db.link.count({
      where: {
        key: slug,
        domain,
      },
    });

    return c.json({ exists: link > 0 });
  })
  .delete("/:linkId", async (c) => {
    const linkId = c.req.param("linkId");

    const link = await db.link.delete({
      where: { id: linkId },
    });

    return c.json({ link });
  });

export default linksApp;
