import Link from "next/link";

import {
  CornerDownRight,
  MoreHorizontal,
  MousePointerClickIcon,
} from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";
import { Card, CardContent, CardFooter } from "@clikz/ui/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@clikz/ui/components/ui/dropdown-menu";

import { LinkFavIcon } from "./link-fav-icon";

export type LinkProps = {
  shortUrl: string;
  domain: string;
  slug: string;
  longUrl: string;
  totalClicks: number;
};

export function LinkCard({
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
        <div className="flex  items-center space-x-4">
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
              <CornerDownRight className="size-3 mr-1" />
              <Link href={longUrl} target="_blank">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
