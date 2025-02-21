import Link from "next/link";

import { MousePointerClickIcon, MoveRightIcon } from "lucide-react";

import { Card, CardContent, CardFooter } from "@clikz/ui/components/ui/card";

import LinkActions from "./link-actions";
import { LinkDataProps } from "./link-card";
import LinkFavIcon from "./link-fav-icon";

export function LinkRow({
  id,
  shortUrl,
  longUrl,
  totalClicks,
  slug,
  domain,
}: LinkDataProps) {
  return (
    <Card className="flex flex-row justify-between transition rounded-none">
      <CardContent className="flex items-center w-0 p-2 px-4 overflow-hidden grow sm:p-4">
        <div className="relative hidden mr-2 overflow-hidden rounded-full shrink-0 sm:block">
          <LinkFavIcon
            url={longUrl}
            imageProps={{ loading: "lazy" }}
            className="object-cover size-6"
          />
        </div>
        <div className="flex items-center gap-2 grow">
          <Link href={shortUrl} target="_blank">
            <h3 className="text-sm truncate sm:text-base">{`${domain}/${slug}`}</h3>
          </Link>
          <div className="flex items-center">
            <MoveRightIcon className="mr-1 size-4 text-muted-foreground/40" />
            <Link href={longUrl} target="_blank">
              <p className="text-sm truncate sm:text-base text-muted-foreground hover:underline underline-offset-2">
                {longUrl}
              </p>
            </Link>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-2 shrink-0 sm:p-4">
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
