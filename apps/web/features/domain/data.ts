import { DomainStatus } from "@prisma/client";

import { getApexDomain, getSubdomain } from "@clikz/utils/functions";

import { db } from "~/lib/db";
import { DomainVerification } from "~/lib/types";
import { VERCEL_PROJECT_ID, VERCEL_TEAM_ID, vercel } from "~/lib/vercel";
import { FetchParamsSchema } from "~/lib/zod/schemas";

type GetWorkspaceDomains = FetchParamsSchema & {
  workspaceSlug: string;
  verified?: boolean;
};

export const getDomains = async ({
  workspaceSlug,
  verified,
  page = "0",
  limit = "10",
}: GetWorkspaceDomains) => {
  const domains = await db.domain.findMany({
    where: { workspaceSlug, status: verified ? "VERIFIED" : undefined },
    orderBy: { createdAt: "desc" },
    skip: parseInt(page) * parseInt(limit),
    take: parseInt(limit),
  });

  return domains;
};

const CNAME_RECORD = "cname.vercel-dns.com";
const A_RECORD = "76.76.21.21";

export const getDomainStatus = async (
  domain: string
): Promise<{ status: DomainStatus; verifications: DomainVerification[] }> => {
  const idOrName = VERCEL_PROJECT_ID;
  const apexDomain = getApexDomain(domain);
  const isApexDomain = domain === apexDomain;

  const verifications: DomainVerification[] = [];

  if (isApexDomain) {
    const [
      apexDomainVerification,
      apexDomainConfig,
      domainVerification,
      domainConfig,
    ] = await Promise.all([
      vercel.projects.getProjectDomain({
        idOrName,
        domain: apexDomain,
        teamId: VERCEL_TEAM_ID,
      }),
      vercel.domains.getDomainConfig({
        domain: apexDomain,
        teamId: VERCEL_TEAM_ID,
      }),
      vercel.projects.getProjectDomain({
        idOrName,
        domain,
        teamId: VERCEL_TEAM_ID,
      }),
      vercel.domains.getDomainConfig({ domain, teamId: VERCEL_TEAM_ID }),
    ]);

    // Check if the Main domain is verified and has the correct record(s)
    if (
      !apexDomainVerification.verified &&
      apexDomainVerification.verification?.length
    ) {
      verifications.push(...apexDomainVerification.verification);
    }

    // Check if the WWW domain is verified and has the correct record(s)
    if (
      !domainVerification.verified &&
      domainVerification.verification?.length
    ) {
      verifications.push(...domainVerification.verification);
    }

    if (!apexDomainConfig.misconfigured) {
      verifications.push({
        type: "A",
        value: A_RECORD,
        reason: "Missing CNAME record",
        domain: "@",
      });
    }

    if (!domainConfig.misconfigured) {
      verifications.push({
        type: "CNAME",
        value: CNAME_RECORD,
        reason: "Missing A record",
        domain: "www",
      });
    }
  } else {
    const [domainVerification, domainConfig] = await Promise.all([
      vercel.projects.getProjectDomain({
        idOrName,
        domain,
        teamId: VERCEL_TEAM_ID,
      }),
      vercel.domains.getDomainConfig({ domain, teamId: VERCEL_TEAM_ID }),
    ]);

    // Check if the WWW domain is verified and has the correct record(s)
    if (
      !domainVerification.verified &&
      domainVerification.verification?.length
    ) {
      verifications.push(...domainVerification.verification);
    }

    if (domainConfig.misconfigured) {
      verifications.push({
        type: "CNAME",
        value: CNAME_RECORD,
        reason: "Missing A record",
        domain: getSubdomain(domain) || "@",
      });
    }
  }
  return {
    status: verifications.length > 0 ? "PENDING" : "VERIFIED",
    verifications,
  };
};
