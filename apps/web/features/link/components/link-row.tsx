import Link from "next/link";

import { MousePointerClickIcon, MoveRightIcon } from "lucide-react";

import { CopyButton } from "@clikz/ui/components/copy-button";
import { Card, CardContent, CardFooter } from "@clikz/ui/components/ui/card";

import { BASE_DOMAIN } from "~/lib/constants";

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
    <Card className="flex flex-row justify-between transition rounded-none text-sm">
      <CardContent className="flex items-center w-0 p-2 px-4 overflow-hidden grow sm:p-4">
        <div className="relative hidden mr-2 overflow-hidden rounded-full shrink-0 sm:block">
          <LinkFavIcon
            url={longUrl}
            imageProps={{ loading: "lazy" }}
            className="object-cover size-5"
          />
        </div>
        <div className="flex items-center gap-2 grow overflow-hidden">
          <div className="flex items-center max-w-[50%] ">
            <Link href={shortUrl} target="_blank" className="truncate">
              {`${domain}/${slug === "_root" && domain !== BASE_DOMAIN ? "" : slug}`}
            </Link>
            <span className="sr-only">Copy</span>
            <CopyButton
              value={shortUrl}
              variant="ghost"
              className="ml-1 shrink-0 p-0 gap-0"
            />
          </div>
          <div className="flex items-center flex-1 max-w-[50%]">
            <MoveRightIcon className="mr-1 size-4 text-muted-foreground/40 shrink-0" />
            <Link
              href={longUrl}
              target="_blank"
              className="truncate text-muted-foreground hover:underline underline-offset-2"
            >
              {longUrl ? (
                <Link
                  href={longUrl}
                  target="_blank"
                  className=" truncate text-muted-foreground hover:underline underline-offset-2"
                >
                  {longUrl}
                </Link>
              ) : (
                <span className=" truncate text-muted-foreground">
                  No Redirect configured
                </span>
              )}
            </Link>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-2 shrink-0 sm:p-4">
        <div className="flex items-center px-2 py-1 border rounded-lg text-muted-foreground border-muted">
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
