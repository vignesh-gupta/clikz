import { ImageProps } from "next/image";

import { Globe2 } from "lucide-react";

import { cn } from "@clikz/ui/lib/utils";

import { GOOGLE_FAVICON_URL_V2 } from "~/lib/constants";

import { BlurImage } from "../blur-image";

export function LinkFavIcon({
  host,
  className,
  imageProps,
}: {
  host?: string | null;
  className?: string;
  imageProps?: Partial<ImageProps>;
}) {
  return host ? (
    <BlurImage
      src={`${GOOGLE_FAVICON_URL_V2}${host}`}
      alt={host}
      className={cn("h-9 w-9 rounded-full", className)}
      width={20}
      height={20}
      draggable={false}
      {...imageProps}
    />
  ) : (
    <div
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 px-0 sm:h-10 sm:w-10",
        className
      )}
    >
      <Globe2 className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5" />
    </div>
  );
}
