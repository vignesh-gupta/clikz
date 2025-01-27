"use client";

import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";
import { useView } from "~/lib/hooks/use-view";
import { LinkProp } from "~/lib/types";

import { useGetLinks } from "../api/use-get-links";
import { LinkCard } from "./link-card";
import { LinkRow } from "./link-row";

type LinksListProps = {
  initialLinks?: LinkProp[];
};

const LinkList = ({ initialLinks }: LinksListProps) => {
  const workspaceSlug = useWorkspaceSlug();

  const { data: links } = useGetLinks({
    workspaceSlug,
    initialLinks,
  });

  const { view } = useView();

  if (view === "grid") {
    return (
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
        {links?.map(({ id, domain, shortLink, key, url, clicks }) => (
          <LinkCard
            key={`link-grid-${id}`}
            id={id}
            slug={key}
            longUrl={url}
            domain={domain}
            totalClicks={clicks}
            shortUrl={shortLink}
          />
        ))}
      </div>
    );
  }

  if (view === "row") {
    return (
      <div className="space-y-1">
        {links?.map(({ id, domain, shortLink, key, url, clicks }) => (
          <LinkRow
            key={`link-row-${id}`}
            id={id}
            slug={key}
            longUrl={url}
            domain={domain}
            totalClicks={clicks}
            shortUrl={shortLink}
          />
        ))}
      </div>
    );
  }
};

export default LinkList;
