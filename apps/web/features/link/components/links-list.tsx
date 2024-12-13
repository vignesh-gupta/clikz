"use client";

import { Link } from "@prisma/client";

import { useView } from "~/lib/hooks/use-view";

import { LinkCard } from "./link-card";
import { LinkRow } from "./link-row";

export type LinksProps = {
  links: Link[];
};

const LinkList = ({ links }: LinksProps) => {
  const { view } = useView();

  if (view === "grid") {
    return (
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
        {links.map(({ id, domain, shortLink, key, url }) => (
          <LinkCard
            key={id}
            slug={key}
            longUrl={url}
            domain={domain}
            totalClicks={0}
            shortUrl={shortLink}
          />
        ))}
      </div>
    );
  }

  if (view === "row") {
    return (
      <div className="space-y-1">
        {links.map(({ id, domain, shortLink, key, url }) => (
          <LinkRow
            key={id}
            slug={key}
            longUrl={url}
            domain={domain}
            totalClicks={0}
            shortUrl={shortLink}
          />
        ))}
      </div>
    );
  }
};

export default LinkList;
