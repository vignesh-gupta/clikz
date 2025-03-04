import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { roleMiddleware } from "~/lib/backend/role-middleware";
import { sessionMiddleware } from "~/lib/backend/session-middleware";
import { db } from "~/lib/db";
import { VERCEL_PROJECT_ID, vercel } from "~/lib/vercel";
import {
  domainSchema,
  fetchParamsSchema,
  workspaceSlugSchema,
} from "~/lib/zod-schemas";

import { getDomains } from "./data";

const domainApp = new Hono()
  .get(
    "/",
    sessionMiddleware,
    roleMiddleware(),
    zValidator("query", workspaceSlugSchema),
    zValidator("query", fetchParamsSchema),
    async (c) => {
      const { page, limit, workspaceSlug } = c.req.valid("query");

      const domains = await getDomains({ page, limit, workspaceSlug });

      return c.json({ domains });
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

      console.log({ domainData, membership, workspaceSlug });

      const addToVercel = await vercel.projects.addProjectDomain({
        idOrName: VERCEL_PROJECT_ID,
        requestBody: {
          name: domainData.slug,
        },
      });

      console.log({ addToVercel });

      const domain = await db.domain.create({
        data: {
          name: domainData.slug,
          expiredUrl: domainData.expiredUrl,
          notFoundUrl: domainData.notFoundUrl,
          placeholder: domainData.placeholder,
          isArchived: domainData.isArchived,
          status: addToVercel.verified ? "VERIFIED" : "PENDING",
          workspaceId: membership.workspaceId,
          workspaceSlug,
          DomainVerification: {
            createMany: {
              data: (addToVercel.verification || []).map((verification) => ({
                domain: verification.domain,
                reason: verification.reason,
                type: verification.type,
                value: verification.value,
              })),
            },
          },
        },
      });

      return c.json(domain, 201);
    }
  );

export default domainApp;
