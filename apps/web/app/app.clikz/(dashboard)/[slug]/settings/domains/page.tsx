import {
  DEFAULT_PAGE_LIMIT,
  DEFAULT_PAGE_NUMBER,
} from "@clikz/utils/constants";

import PageHeader from "~/components/page-header";
import { DomainManagement } from "~/features/domain/components/domain-management";
import { getDomains } from "~/features/domain/data";
import { FetchParamsSchema } from "~/lib/zod/schemas";
import { PageWithSlugParams } from "~/types/pages.types";

type WorkspaceDomainPageProp = PageWithSlugParams & {
  searchParams: Promise<FetchParamsSchema>;
};

const WorkspaceDomainsPage = async ({
  params,
  searchParams,
}: WorkspaceDomainPageProp) => {
  const { slug } = await params;
  const { limit, page } = await searchParams;

  const domains = await getDomains({
    workspaceSlug: slug,
    limit: limit || DEFAULT_PAGE_LIMIT,
    page: page || DEFAULT_PAGE_NUMBER,
  });

  return (
    <>
      <PageHeader />
      <DomainManagement initialDomains={domains} limit={limit} page={page} />
    </>
  );
};

export default WorkspaceDomainsPage;
