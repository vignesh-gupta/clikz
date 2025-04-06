import { ImageProps } from "next/image";
import { memo } from "react";

import { Globe2 } from "lucide-react";

import { cn } from "@clikz/ui/lib/utils";
import { GOOGLE_FAVICON_URL_V2 } from "@clikz/utils/constants";
import { getDomainWithoutWWW } from "@clikz/utils/functions";

import { BlurImage } from "~/components/blur-image";

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
  const validUrl = url && getDomainWithoutWWW(url);

  return validUrl ? (
    <BlurImage
      src={`${GOOGLE_FAVICON_URL_V2}${validUrl}`}
      alt={`${validUrl}'s favicon`}
      className={cn("size-8 rounded-full", className)}
      width={height || 20}
      height={width || 20}
      draggable={false}
      {...imageProps}
    />
  ) : (
    <div
      className={cn(
        "flex size-8 items-center justify-center rounded-full bg-gray-100 px-0",
        className
      )}
    >
      <Globe2 className="w-4 h-4 text-gray-600 sm:h-5 sm:w-5" />
    </div>
  );
}

export default memo(LinkFavIcon);
