"use client";

import { useSearchParams } from "next/navigation";

import { Link } from "@prisma/client";

import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "~/lib/constants";
import { useView } from "~/lib/hooks/use-view";

import { useGetLinks } from "../api/use-get-links";
import { LinkCard } from "./link-card";
import { LinkRow } from "./link-row";

type LinksListProps = {
  initialLinks?: Link[];
};

const LinkList = ({ initialLinks }: LinksListProps) => {
  const workspaceSlug = useWorkspaceSlug();

  const searchParams = useSearchParams();

  const { data: links } = useGetLinks({
    workspaceSlug,
    initialLinks,
    page: searchParams.get("page") ?? DEFAULT_PAGE,
    limit: searchParams.get("limit") ?? DEFAULT_PAGE_SIZE,
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
