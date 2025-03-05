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
  )
  .patch(
    "/:id/status",
    sessionMiddleware,
    zValidator("query", workspaceSlugSchema),
    roleMiddleware(),
    async (c) => {
      const domainId = c.req.param("id");

      const membership = c.get("membership");

      const domain = await db.domain.findFirst({
        where: {
          id: domainId,
          workspaceId: membership.workspaceId,
        },
      });

      if (!domain) {
        return c.json({ error: "Domain not found" }, 404);
      }

      console.log({ name: domain.name });

      const statusOnVercel = await vercel.projects.getProjectDomain({
        domain: domain.name,
        idOrName: VERCEL_PROJECT_ID,
      });

      if (!statusOnVercel.verified) {
        return c.json({ message: "Domain not verified", isVerified: false });
      }

      await db.domain.update({
        where: {
          id: domainId,
        },
        data: {
          status: "VERIFIED",
          DomainVerification: {
            deleteMany: {
              mainDomainId: domainId,
            },
          },
        },
      });

      return c.json({ message: "Domain verified", isVerified: true });
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

      db.domainVerification.deleteMany({
        where: {
          mainDomainId: domainId,
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
