import Link from "next/link";

import { CornerDownRight, MousePointerClickIcon } from "lucide-react";

import { Card, CardContent, CardFooter } from "@clikz/ui/components/ui/card";

import LinkActions from "./link-actions";
import { LinkFavIcon } from "./link-fav-icon";

export type LinkProps = {
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
}: LinkProps) {
  const host = new URL(longUrl).host;

  return (
    <Card className="w-full max-w-md transition hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <LinkFavIcon
              host={host}
              imageProps={{ loading: "lazy" }}
              className="object-cover"
            />
          </div>
          <div className="flex-grow min-w-0">
            <Link href={shortUrl} target="_blank">
              <h3 className="truncate">{`${domain}/${slug}`}</h3>
            </Link>
            <div className="flex items-center">
              <CornerDownRight height={16} width={16} className=" mr-1" />
              <Link href={longUrl} target="_blank" className="flex-1 truncate">
                <p className="text-sm text-muted-foreground truncate hover:underline underline-offset-2">
                  {longUrl}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground flex items-center border p-1 rounded-lg">
          <MousePointerClickIcon className="size-4 mr-1" />
          {totalClicks} {totalClicks === 1 ? "click" : "clicks"}
        </div>
        <LinkActions linkId={id} />
      </CardFooter>
    </Card>
  );
}
