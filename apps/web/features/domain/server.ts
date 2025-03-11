import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { roleMiddleware } from "~/lib/backend/role-middleware";
import { sessionMiddleware } from "~/lib/backend/session-middleware";
import { db } from "~/lib/db";
import { getApexDomain } from "~/lib/utils/url";
import { VERCEL_PROJECT_ID, vercel } from "~/lib/vercel";
import {
  domainFilterSchema,
  domainSchema,
  domainStatusUpdateSchema,
  fetchParamsSchema,
  workspaceSlugSchema,
} from "~/lib/zod-schemas";

import { getDomainStatus, getDomains } from "./data";

const domainApp = new Hono()
  .get(
    "/",
    sessionMiddleware,
    roleMiddleware(),
    zValidator("query", workspaceSlugSchema),
    zValidator("query", fetchParamsSchema),
    zValidator("query", domainFilterSchema),
    async (c) => {
      const { page, limit, workspaceSlug, verified } = c.req.valid("query");

      const domains = await getDomains({
        page,
        limit,
        workspaceSlug,
        verified: verified === "true",
      });
      console.log("Fetched domains", domains);

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

      const apexDomain = getApexDomain(domainData.slug);

      const isApexDomain = apexDomain === domainData.slug;

      const domainSlug = isApexDomain
        ? `www.${domainData.slug}`
        : domainData.slug;

      if (isApexDomain) {
        await Promise.all([
          vercel.projects.addProjectDomain({
            idOrName: VERCEL_PROJECT_ID,
            requestBody: {
              name: apexDomain,
            },
          }),
          vercel.projects.addProjectDomain({
            idOrName: VERCEL_PROJECT_ID,
            requestBody: {
              name: domainSlug,
              redirect: `https://${apexDomain}`,
              redirectStatusCode: 301,
            },
          }),
        ]);
      } else {
        await vercel.projects.addProjectDomain({
          idOrName: VERCEL_PROJECT_ID,
          requestBody: {
            name: domainSlug,
          },
        });
      }

      const domain = await db.domain.create({
        data: {
          name: domainData.slug,
          expiredUrl: domainData.expiredUrl,
          notFoundUrl: domainData.notFoundUrl,
          placeholder: domainData.placeholder,
          isArchived: domainData.isArchived,
          status: "PENDING",
          workspaceId: membership.workspaceId,
          workspaceSlug,
        },
      });

      return c.json(domain, 201);
    }
  )
  .patch(
    "/:id/status",
    sessionMiddleware,
    zValidator("query", workspaceSlugSchema),
    zValidator("json", domainStatusUpdateSchema),
    roleMiddleware(),
    async (c) => {
      const domainId = c.req.param("id");
      const membership = c.get("membership");
      const { workspaceSlug } = c.req.valid("query");
      const { slug, currentStatus } = c.req.valid("json");

      const { status, verifications } = await getDomainStatus(slug);

      if (currentStatus === status) return c.json({ status, verifications });

      const domain = await db.domain.findFirst({
        where: {
          id: domainId,
          workspaceId: membership.workspaceId,
        },
      });

      if (!domain) {
        return c.json({ status, verifications });
      }

      if (status !== domain.status) {
        if (status === "VERIFIED") {
          await Promise.all([
            db.link.create({
              data: {
                domain: domain.name,
                userId: membership.userId,
                key: "_root",
                url: domain.notFoundUrl || "",
                shortLink: `https://${domain.name}`,
                workspaceId: membership.workspaceId,
                workspaceSlug,
              },
            }),
            db.domain.update({
              where: {
                id: domainId,
              },
              data: {
                status,
              },
            }),
          ]);
        } else {
          await Promise.all([
            db.link.deleteMany({
              where: {
                domain: domain.name,
              },
            }),
            db.domain.update({
              where: {
                id: domainId,
              },
              data: {
                status,
              },
            }),
          ]);
        }
      }

      return c.json({ status, verifications });
    }
  )
  .delete(
    "/:id",
    sessionMiddleware,
    zValidator("query", workspaceSlugSchema),
    roleMiddleware(),
    async (c) => {
      const workspace = c.get("workspace");
      const domainId = c.req.param("id");

      if (!workspace) return c.json({ error: "Workspace not found" }, 404);

      const domain = await db.domain.findFirst({
        where: {
          id: domainId,
          workspaceId: workspace.id,
        },
      });

      if (!domain) return c.json({ error: "Domain not found" }, 404);

      await db.domain.delete({
        where: {
          id: domainId,
          workspaceId: workspace.id,
        },
      });

      vercel.projects.removeProjectDomain({
        domain: domain.name,
        idOrName: VERCEL_PROJECT_ID,
      });

      return c.json({ message: "Domain deleted" });
    }
  );

export default domainApp;
