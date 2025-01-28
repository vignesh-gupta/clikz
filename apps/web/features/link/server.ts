import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import { roleMiddleware } from "~/lib/backend/role-middleware";
import { sessionMiddleware } from "~/lib/backend/session-middleware";
import {
  BASE_DOMAIN,
  SHORT_REDIRECT_DOMAIN,
  SHORT_REDIRECT_URL,
} from "~/lib/constants";
import { db } from "~/lib/db";
import { fetchParamsSchema, linkSchema } from "~/lib/zod-schemas";

import { getLinks } from "./data";

const workspaceSlugSchema = z.object({
  workspaceSlug: z.string(),
});

const linksApp = new Hono()
  .get(
    "/",
    zValidator("query", workspaceSlugSchema),
    zValidator("query", fetchParamsSchema),
    async (c) => {
      const { workspaceSlug, page, limit } = c.req.valid("query");

      const link = await getLinks({ workspaceSlug, page, limit });

      if (!link) {
        return c.json({ error: "Link not found" }, 404);
      }

      return c.json({ link });
    }
  )
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
  .post(
    "/",
    sessionMiddleware,
    roleMiddleware(),
    zValidator("query", workspaceSlugSchema),
    zValidator("json", linkSchema),
    async (c) => {
      const { destination, slug, comment } = c.req.valid("json");
      const { workspaceSlug } = c.req.valid("query");

      const user = c.get("user");

      if (!user || !user.id) {
        return c.json({ error: "Unauthenticated" }, 401);
      }

      const link = await db.link.create({
        data: {
          domain: SHORT_REDIRECT_DOMAIN ?? "clikz.live",
          key: slug,
          shortLink: new URL(`/${slug}`, SHORT_REDIRECT_URL).toString(),
          url: destination,
          comment,
          Workspace: {
            connect: {
              slug: workspaceSlug,
            },
          },
          User: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      return c.json({ link });
    }
  )
  .patch(
    "/:linkId",
    sessionMiddleware,
    roleMiddleware(),
    zValidator("json", linkSchema.partial()),
    zValidator("query", workspaceSlugSchema),
    async (c) => {
      const { comment, destination, slug } = c.req.valid("json");

      const linkId = c.req.param("linkId");

      const link = await db.link.update({
        where: { id: linkId },
        data: {
          comment,
          url: destination,
          key: slug,
          shortLink: slug
            ? new URL(`/${slug}`, SHORT_REDIRECT_URL).toString()
            : undefined,
        },
      });

      return c.json({ link });
    }
  )
  .delete("/:linkId", async (c) => {
    const linkId = c.req.param("linkId");

    const link = await db.link.delete({
      where: { id: linkId },
    });

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
  });

export default linksApp;
