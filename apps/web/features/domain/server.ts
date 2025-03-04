import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { roleMiddleware } from "~/lib/backend/role-middleware";
import { sessionMiddleware } from "~/lib/backend/session-middleware";
import { db } from "~/lib/db";
import { VERCEL_PROJECT_ID, vercel } from "~/lib/vercel";
import { domainSchema, workspaceSlugSchema } from "~/lib/zod-schemas/domain";

const domainApp = new Hono()
  .get(
    "/",
    sessionMiddleware,
    roleMiddleware(),
    zValidator("query", workspaceSlugSchema),
    async (c) => {
      const workspaceSlug = c.req.valid("query").workspaceSlug;

      const domains = await db.domain.findMany({
        where: {
          workspaceSlug,
        },
      });

      c.json({ data: domains });
    }
  )
  .post(
    "/",
    sessionMiddleware,
    roleMiddleware(),
    zValidator("query", workspaceSlugSchema),
    zValidator("json", domainSchema),
    async (c) => {
      const workspaceSlug = c.req.valid("query").workspaceSlug;

      const membership = c.get("membership");

      const domainData = c.req.valid("json");

      const addToVercel = await vercel.projects.addProjectDomain({
        idOrName: VERCEL_PROJECT_ID,
        requestBody: {
          name: domainData.slug,
        },
      });

      const domain = await db.domain.create({
        data: {
          name: domainData.slug,
          expiredUrl: domainData.expiredUrl,
          notFoundUrl: domainData.notFoundUrl,
          placeholder: domainData.placeholder,
          isArchived: domainData.isArchived,
          status: addToVercel.verified ? "VERIFIED" : "PENDING",
          verification: addToVercel.verification,
          workspaceId: membership.workspaceId,
          workspaceSlug,
        },
      });

      return c.json(domain, 201);
    }
  );

export default domainApp;
