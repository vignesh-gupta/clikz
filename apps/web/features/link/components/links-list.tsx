"use client";

import { Link } from "@prisma/client";

import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";
import { useView } from "~/lib/hooks/use-view";

import { useGetWorkspaceLinks } from "../api/use-get-workspace-links";
import { LinkCard } from "./link-card";
import { LinkRow } from "./link-row";

export type LinksProps = {
  initialLinks: Link[];
};

const LinkList = ({ initialLinks }: LinksProps) => {
  const workspaceSlug = useWorkspaceSlug();

  const { data: links } = useGetWorkspaceLinks({
    workspaceSlug,
    initialLinks,
  });

  const { view } = useView();

  if (view === "grid") {
    return (
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
        {links?.map(({ id, domain, shortLink, key, url, clicks }) => (
          <LinkCard
            key={id}
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
            key={id}
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
