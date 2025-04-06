import { after } from "next/server";

import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { BASE_DOMAIN, BASE_URL } from "@clikz/utils/constants";
import { truncate } from "@clikz/utils/functions";

import {
  ClikzApiError,
  handleAndReturnAPIErrorResponse,
} from "~/lib/backend/error";
import { generateAPIResponse } from "~/lib/backend/response";
import { roleMiddleware } from "~/lib/backend/role-middleware";
import { sessionMiddleware } from "~/lib/backend/session-middleware";
import { deleteLinkFromRedis, setLinkToRedis } from "~/lib/cache/link";
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
      try {
        const { workspaceSlug, page, limit } = c.req.valid("query");

        const links = await getLinks({ workspaceSlug, page, limit });

        return c.json(generateAPIResponse(links));
      } catch (err) {
        const { json, status, headers } = handleAndReturnAPIErrorResponse(err);
        return c.json(json, status, headers);
      }
    }
  )
  .get("/:linkId", sessionMiddleware, async (c) => {
    try {
      const linkId = c.req.param("linkId");

      if (linkId === "new") {
        return c.json(generateAPIResponse(null));
      }

      const link = await db.link.findUniqueOrThrow({
        where: { id: linkId },
      });

      return c.json(generateAPIResponse(link));
    } catch (error) {
      const { json, status, headers } = handleAndReturnAPIErrorResponse(error);
      return c.json(json, status, headers);
    }
  })
  .post(
    "/",
    sessionMiddleware,
    roleMiddleware(),
    zValidator("query", workspaceSlugSchema),
    zValidator("json", linkSchema),
    async (c) => {
      try {
        const {
          destination,
          slug,
          comment,
          domain,
          title,
          description,
          ...rest
        } = c.req.valid("json");

        const workspace = c.get("workspace");

        const user = c.get("user");

        if (!user || !user.id) {
          throw new ClikzApiError({
            code: "unauthorized",
            message: "User is not logged in",
          });
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
            title: truncate(title, 100),
            description: truncate(description, 200),
            ...rest,
          },
        });

        return c.json(generateAPIResponse(link), 201);
      } catch (err) {
        const { json, status, headers } = handleAndReturnAPIErrorResponse(err);
        return c.json(json, status, headers);
      }
    }
  )
  .patch(
    "/:linkId",
    sessionMiddleware,
    roleMiddleware(),
    zValidator("json", linkSchema),
    zValidator("query", workspaceSlugSchema),
    async (c) => {
      try {
        const {
          comment,
          destination,
          slug,
          domain,
          title,
          description,
          ...rest
        } = c.req.valid("json");

        const linkId = c.req.param("linkId");

        const existingLink = await db.link.findUniqueOrThrow({
          where: { id: linkId },
        });

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
            title: truncate(title, 100),
            description: truncate(description, 200),
            ...rest,
          },
        });

        after(() => {
          setLinkToRedis(slug, domain || BASE_DOMAIN, link);
        });

        return c.json(generateAPIResponse(link));
      } catch (error) {
        const { json, status, headers } =
          handleAndReturnAPIErrorResponse(error);
        return c.json(json, status, headers);
      }
    }
  )
  .delete(
    "/:linkId",
    sessionMiddleware,
    roleMiddleware(),
    zValidator("query", workspaceSlugSchema),
    async (c) => {
      try {
        const linkId = c.req.param("linkId");

        const link = await db.link.delete({
          where: { id: linkId },
        });
        after(() => deleteLinkFromRedis(link.key, link.domain));

        return c.json(generateAPIResponse(link));
      } catch (error) {
        const { json, status, headers } =
          handleAndReturnAPIErrorResponse(error);
        return c.json(json, status, headers);
      }
    }
  )
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
