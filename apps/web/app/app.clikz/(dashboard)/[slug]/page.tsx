import {
  DEFAULT_PAGE_LIMIT,
  DEFAULT_PAGE_NUMBER,
} from "@clikz/utils/constants";

import PageHeader from "~/components/page-header";
import LinkList from "~/features/link/components/links-list";
import { getLinks } from "~/features/link/data";
import { PageWithSlugParams } from "~/lib/types";
import { FetchParamsSchema } from "~/lib/zod/schemas";

import PageFilters from "./_components/filter";

type WorkspaceLinkPageProp = PageWithSlugParams & {
  searchParams: Promise<FetchParamsSchema>;
};

const WorkspaceLinkPage = async ({
  params,
  searchParams,
}: WorkspaceLinkPageProp) => {
  const { slug } = await params;
  const sp = await searchParams;

  const links = await getLinks({
    workspaceSlug: slug,
    page: sp.page || DEFAULT_PAGE_NUMBER,
    limit: sp.limit || DEFAULT_PAGE_LIMIT,
  });

  return (
    <div className="flex flex-col flex-1 h-full gap-y-2">
      <PageHeader title="Links" />
      <div className="flex-1 space-y-4">
        <PageFilters />
        <LinkList initialLinks={links} />
      </div>
    </div>
  );
};

export default WorkspaceLinkPage;
