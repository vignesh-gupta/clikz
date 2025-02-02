import { ImageProps } from "next/image";
import { memo } from "react";

import { Globe2 } from "lucide-react";

import { cn } from "@clikz/ui/lib/utils";

import { BlurImage } from "~/components/blur-image";
import { GOOGLE_FAVICON_URL_V2 } from "~/lib/constants";

function LinkFavIcon({
  url,
  className,
  imageProps,
  height,
  width,
}: {
  url?: string | null;
  className?: string;
  imageProps?: Partial<ImageProps>;
  height?: number;
  width?: number;
}) {
  const host = url ? new URL(url).host : null;
  return host ? (
    <BlurImage
      src={`${GOOGLE_FAVICON_URL_V2}${host}`}
      alt={host}
      className={cn("h-9 w-9 rounded-full", className)}
      width={height || 20}
      height={width || 20}
      draggable={false}
      {...imageProps}
    />
  ) : (
    <div
      className={cn(
        "flex size-8 items-center justify-center rounded-full bg-gray-100 px-0 sm:h-10 sm:w-10",
        className
      )}
    >
      <Globe2 className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5" />
    </div>
  );
}

export default memo(LinkFavIcon);
