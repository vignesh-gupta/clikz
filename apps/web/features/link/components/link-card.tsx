import Link from "next/link";

import { CornerDownRight, MousePointerClickIcon } from "lucide-react";

import { Card, CardContent, CardFooter } from "@clikz/ui/components/ui/card";

import LinkActions from "./link-actions";
import LinkFavIcon from "./link-fav-icon";

export type LinkDataProps = {
  id: string;
  shortUrl: string;
  domain: string;
  slug: string;
  longUrl: string;
  totalClicks: number;
};

export function LinkCard({
  id,
  shortUrl,
  longUrl,
  totalClicks,
  slug,
  domain,
}: LinkDataProps) {
  return (
    <Card className="w-full transition hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative flex-shrink-0 overflow-hidden rounded-full">
            <LinkFavIcon
              url={longUrl}
              imageProps={{ loading: "lazy" }}
              className="object-cover sm:size-8 size-6"
            />
          </div>
          <div className="flex-grow">
            <Link href={shortUrl} target="_blank">
              <h3 className="truncate">{`${domain}/${slug}`}</h3>
            </Link>
            <div className="flex items-center">
              <CornerDownRight className="mx-1 size-3 text-muted-foreground/40" />
              <Link href={longUrl} target="_blank" className="flex-1 truncate">
                <p className="text-sm truncate text-muted-foreground hover:underline underline-offset-2">
                  {longUrl}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center px-2 py-1 text-sm border rounded-lg text-muted-foreground border-muted">
          <MousePointerClickIcon className="mr-1 size-4" />
          {totalClicks}
          <span className="hidden ml-1 sm:inline">
            {totalClicks === 1 ? "click" : "clicks"}
          </span>
        </div>
        <LinkActions linkId={id} shortUrl={shortUrl} />
      </CardFooter>
    </Card>
  );
}
