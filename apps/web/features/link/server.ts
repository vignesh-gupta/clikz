import { after } from "next/server";

import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import {
  generateAPIErrorResponse,
  generateAPIResponse,
} from "~/lib/backend/response";
import { roleMiddleware } from "~/lib/backend/role-middleware";
import { sessionMiddleware } from "~/lib/backend/session-middleware";
import { deleteLinkFromRedis, setLinkToRedis } from "~/lib/cache/link";
import { BASE_DOMAIN, BASE_URL } from "~/lib/constants";
import { db } from "~/lib/db";
import {
  fetchParamsSchema,
  linkSchema,
  workspaceSlugSchema,
} from "~/lib/zod/schemas";

import { getLinks } from "./data";

const linksApp = new Hono()
  .get(
    "/",
    sessionMiddleware,
    roleMiddleware(),
    zValidator("query", workspaceSlugSchema),
    zValidator("query", fetchParamsSchema),
    async (c) => {
      const { workspaceSlug, page, limit } = c.req.valid("query");

      const links = await getLinks({ workspaceSlug, page, limit });

      if (!links) {
        return c.json(
          generateAPIErrorResponse("not_found", "No links found"),
          404
        );
      }
      return c.json(generateAPIResponse(links));
    }
  )
  .get("/:linkId", sessionMiddleware, roleMiddleware(), async (c) => {
    const linkId = c.req.param("linkId");

    if (linkId === "new") {
      return c.json(generateAPIResponse(null));
    }

    const link = await db.link.findUnique({
      where: { id: linkId },
    });

    if (!link) {
      return c.json(
        generateAPIErrorResponse("not_found", "Link not found"),
        404
      );
    }

    return c.json(generateAPIResponse(link));
  })
  .post(
    "/",
    sessionMiddleware,
    roleMiddleware(),
    zValidator("query", workspaceSlugSchema),
    zValidator("json", linkSchema),
    async (c) => {
      const { destination, slug, comment, domain, ...ogTags } =
        c.req.valid("json");

      const workspace = c.get("workspace");

      const user = c.get("user");

      if (!user || !user.id) {
        return c.json(
          generateAPIErrorResponse("unauthorized", "You are not logged in"),
          401
        );
      }

      const domainURL = new URL(
        domain === BASE_DOMAIN ? BASE_URL : `https://${domain}`
      );
      const link = await db.link.create({
        data: {
          domain: domain || BASE_DOMAIN,
          key: slug,
          shortLink: new URL(`/${slug}`, domainURL).toString(),
          url: destination,
          comment,
          workspaceId: workspace.id,
          workspaceSlug: workspace.slug,
          userId: user.id,
          ...ogTags,
        },
      });

      return c.json(generateAPIResponse(link), 201);
    }
  )
  .patch(
    "/:linkId",
    sessionMiddleware,
    roleMiddleware(),
    zValidator("json", linkSchema),
    zValidator("query", workspaceSlugSchema),
    async (c) => {
      const { comment, destination, slug, domain } = c.req.valid("json");

      const linkId = c.req.param("linkId");

      const existingLink = await db.link.findUnique({
        where: { id: linkId },
      });

      if (!existingLink)
        return c.json(
          generateAPIErrorResponse("not_found", "Link bot found"),
          404
        );

      const domainURL = new URL(
        domain === BASE_DOMAIN ? BASE_URL : `https://${domain}`
      );

      const shortLink = new URL(
        `/${slug || existingLink.key}`,
        domainURL
      ).toString();

      const link = await db.link.update({
        where: { id: linkId },
        data: {
          domain: domain || BASE_DOMAIN,
          comment,
          url: destination,
          key: slug,
          shortLink,
        },
      });

      after(() => {
        setLinkToRedis(slug, domain || BASE_DOMAIN, link);
      });

      return c.json(generateAPIResponse(link));
    }
  )
  .delete("/:linkId", sessionMiddleware, roleMiddleware(), async (c) => {
    const linkId = c.req.param("linkId");

    const link = await db.link.delete({
      where: { id: linkId },
    });
    after(() => deleteLinkFromRedis(link.key, link.domain));

    return c.json(generateAPIResponse(link));
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
