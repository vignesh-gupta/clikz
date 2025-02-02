import Link from "next/link";

import { ArrowRightIcon, MousePointerClickIcon } from "lucide-react";

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
    <Card className="w-full transition hover:-translate-y-1 hover:shadow-lg flex justify-between flex-col sm:flex-row">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <LinkFavIcon
              url={longUrl}
              imageProps={{ loading: "lazy" }}
              className="object-cover"
            />
          </div>
          <div className="flex-1 flex items-center gap-2">
            <Link href={shortUrl} target="_blank">
              <h3 className="truncate">{`${domain}/${slug}`}</h3>
            </Link>
            <div className="flex items-center">
              <ArrowRightIcon className="size-4 mr-1" />
              <Link href={longUrl} target="_blank">
                <p className="text-sm text-muted-foreground truncate hover:underline underline-offset-2">
                  {longUrl}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center sm:p-4">
        <div className="text-sm text-muted-foreground flex items-center border p-1 rounded-lg">
          <MousePointerClickIcon className="size-4 mr-1" />
          {totalClicks} {totalClicks === 1 ? "click" : "clicks"}
        </div>
        <LinkActions linkId={id} shortUrl={shortUrl} />
      </CardFooter>
    </Card>
  );
}
