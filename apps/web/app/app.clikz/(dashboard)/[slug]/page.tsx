import LinkList from "~/features/link/components/links-list";
import { getWorkspaceLinks } from "~/features/link/data";

import PageFilters from "../_components/filter";
import NoLinks from "../_components/link/no-links";

export type PageWithSlugParams = {
  params: Promise<{ slug: string }>;
};

const WorkspaceLinkPage = async ({ params }: PageWithSlugParams) => {
  const { slug } = await params;

  const links = await getWorkspaceLinks(slug);

  return (
    <div className="flex h-full flex-col flex-1 gap-y-2">
      <div className="flex">
        <h1 className="text-xl font-semibold leading-7 text-neutral-900 md:text-2xl">
          Links
        </h1>
      </div>
      <div className="flex-1 space-y-4">
        <PageFilters />
        {links.length === 0 ? <NoLinks /> : <LinkList initialLinks={links} />}
      </div>
    </div>
  );
};

export default WorkspaceLinkPage;
