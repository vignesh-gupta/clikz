/* eslint-disable @next/next/no-img-element */
import { PropsWithChildren } from "react";

import { ImageIcon, LoaderCircle } from "lucide-react";

import { Card, CardContent } from "@clikz/ui/components/ui/card";
import { cn } from "@clikz/ui/lib/utils";

import { isValidUrl } from "~/lib/utils/url";

const ImagePreview = ({
  image,
  loading,
  children,
  className,
}: PropsWithChildren<{
  image?: string;
  loading: boolean;
  className?: string;
}>) => {
  return (
    <div className="relative">
      <div
        className={cn(
          "relative aspect-[2/1] w-full overflow-hidden rounded-lg border border-gray-300 bg-gray-100",
          className
        )}
      >
        {image ? (
          <img
            src={image}
            alt="Preview"
            className="relative size-full rounded-[inherit] object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 bg-white size-full">
            <ImageIcon className="size-8 text-gray-400" />
            <p className="text-sm text-gray-400">
              Enter a link to generate a preview.
            </p>
          </div>
        )}
        {loading && (
          <div className="absolute inset-0 z-[5] flex items-center justify-center rounded-[inherit] bg-white">
            <LoaderCircle className="animate-spin size-5" />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

type BasePreviewProps = {
  title: string;
  image?: string;
  loading: boolean;
};

type WebPreviewProps = BasePreviewProps & {
  description: string;
};

export const WebPreview = ({
  description,
  loading,
  title,
  image,
}: WebPreviewProps) => {
  return (
    <ImagePreview image={image} loading={loading}>
      <div className="px-1 pt-2 space-y-1">
        <h3 className="text-sm line-clamp-1">{title}</h3>
        <p className="text-xs line-clamp-2">{description}</p>
      </div>
    </ImagePreview>
  );
};

export const XPreview = ({ loading, title, image }: BasePreviewProps) => {
  return (
    <ImagePreview image={image} loading={loading} className="rounded-2xl">
      <div className="absolute space-y-1 left-2 bottom-2">
        <h3 className="px-2 py-1 text-sm text-white rounded-md bg-gray-900/35 line-clamp-1">
          {title}
        </h3>
      </div>
    </ImagePreview>
  );
};

type FacebookPreviewProps = BasePreviewProps & {
  description: string;
};

export const FacebookPreview = ({
  title,
  description,
  loading,
  image,
}: FacebookPreviewProps) => {
  return (
    <ImagePreview image={image} loading={loading} className="rounded-none">
      <div className="p-3 space-y-1 bg-gray-100 border-t-0 border-gray-800 rounded-none border-1 line-clamp-1">
        <h3 className="text-sm">{title}</h3>
        <p className="text-xs line-clamp-2">{description}</p>
      </div>
    </ImagePreview>
  );
};

type LinkedInPreviewProps = BasePreviewProps & {
  url: string;
};

export const LinkedInPreview = ({
  url,
  loading,
  title,
  image,
}: LinkedInPreviewProps) => {
  return (
    <Card>
      <CardContent className="grid grid-cols-2 gap-4 p-2 my-auto rounded-md">
        {loading ? (
          <div className="absolute inset-0 z-[5] flex items-center justify-center rounded-[inherit] bg-white">
            <LoaderCircle className="animate-spin size-5" />
          </div>
        ) : image ? (
          <div className="relative flex items-center justify-center">
            <img
              src={image}
              alt="Preview"
              className="object-contain w-full rounded-md"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 space-y-2 text-center bg-gray-200 size-full">
            <ImageIcon className="text-gray-400 size-5" />
            <p className="text-sm text-gray-400 text-pretty">
              Enter a link to generate a preview.
            </p>
          </div>
        )}
        <div className="flex flex-col justify-between py-2">
          <h3 className="text-sm line-clamp-2 ">{title}</h3>
          <p className="text-xs line-clamp-2 text-muted-foreground">
            {url
              ? (isValidUrl(url) && new URL(url).host) || "example.com"
              : url}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
