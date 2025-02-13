import { ImageProps } from "next/image";
import { memo } from "react";

import { Globe2 } from "lucide-react";

import { cn } from "@clikz/ui/lib/utils";

import { BlurImage } from "~/components/blur-image";
import { GOOGLE_FAVICON_URL_V2 } from "~/lib/constants";
import { isValidUrl } from "~/lib/utils/url";

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
  const host = url && isValidUrl(url) ? new URL(url).host : null;
  const domain = host ? host.split(".").slice(-2).join(".") : null;

  return domain ? (
    <BlurImage
      src={`${GOOGLE_FAVICON_URL_V2}${domain}`}
      alt={`${domain} favicon`}
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
