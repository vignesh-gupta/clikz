"use client";

import { ImageIcon, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { FetchMetadata, fetchMetadata } from "~/lib/actions/fetch-metadata";
import { getUrlWithoutUTMParams } from "~/lib/utils";

type LinkPreviewProps = {
  url: string;
};

const LinkPreview = ({ url }: LinkPreviewProps) => {
  const [metadata, setMetadata] = useState<FetchMetadata | null>(null);
  const [loading, setLoading] = useState(false);

  const [debouncedUrl] = useDebounce(getUrlWithoutUTMParams(url), 500);

  useEffect(() => {
    if (!debouncedUrl) return;

    setLoading(true);
    fetchMetadata(debouncedUrl)
      .then((data) => setMetadata(data))
      .catch(() => setMetadata(null))
      .finally(() => setLoading(false));
  }, [debouncedUrl]);

  return (
    <div className="relative aspect-[1.91/1] w-full overflow-hidden rounded-lg border border-gray-300 bg-gray-100">
      {metadata?.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={metadata.image}
          alt="Preview"
          className="relative size-full rounded-[inherit] object-cover"
        />
      ) : (
        <div className="relative flex size-full flex-col items-center justify-center space-y-4 bg-white">
          <ImageIcon className="h-8 w-8 text-gray-400" />
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
  );
};

export default LinkPreview;
