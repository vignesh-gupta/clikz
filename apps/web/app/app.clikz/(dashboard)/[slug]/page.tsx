import PageTitle from "~/components/page-title";
import LinkList from "~/features/link/components/links-list";
import { getLinks } from "~/features/link/data";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "~/lib/constants";
import { FetchParamsSchema } from "~/lib/zod-schemas";

import PageFilters from "./_components/filter";
import NoLinks from "./_components/link/no-links";

export type PageWithSlugParams = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<FetchParamsSchema>;
};

const WorkspaceLinkPage = async ({
  params,
  searchParams,
}: PageWithSlugParams) => {
  const { slug } = await params;
  const sp = await searchParams;

  const links = await getLinks({
    workspaceSlug: slug,
    page: sp.page || DEFAULT_PAGE,
    limit: sp.limit || DEFAULT_PAGE_SIZE,
  });

  return (
    <div className="flex h-full flex-col flex-1 gap-y-2">
      <PageTitle title="Links" />
      <div className="flex-1 space-y-4">
        <PageFilters />
        {links.length === 0 ? <NoLinks /> : <LinkList initialLinks={links} />}
      </div>
    </div>
  );
};

export default WorkspaceLinkPage;
