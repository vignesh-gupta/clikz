"use client";

import { useEffect, useState, useTransition } from "react";

import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaGlobe, FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

import { Card, CardContent } from "@clikz/ui/components/ui/card";
import { Skeleton } from "@clikz/ui/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@clikz/ui/components/ui/tabs";

import { getUrlWithoutUTMParams } from "~/lib/utils/url";

import {
  FacebookPreview,
  LinkedInPreview,
  WebPreview,
  XPreview,
} from "./social-preview";

type FetchMetadata = {
  title: string;
  description: string;
  image: string;
};

type LinkPreviewProps = {
  url: string;
};

const LinkPreview = ({ url }: LinkPreviewProps) => {
  const [metadata, setMetadata] = useState<FetchMetadata | null>(null);
  const [loading, startTransaction] = useTransition();

  const [debouncedUrl] = useDebounce(getUrlWithoutUTMParams(url), 500);

  useEffect(() => {
    if (!debouncedUrl) return;

    const controller = new AbortController();
    startTransaction(() =>
      fetch(`/api/metadata?url=${encodeURIComponent(debouncedUrl)}`, {
        signal: controller.signal,
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch metadata");
          }
          const data = await res.json();
          setMetadata(data);
        })
        .catch(() => {
          toast.error("Failed to fetch metadata");
          setMetadata(null);
        })
    );

    return () => controller.abort();
  }, [debouncedUrl]);

  return (
    <Card className="w-full max-w-md overflow-hidden bg-transparent border-0">
      <CardContent className="p-0">
        <Tabs defaultValue="default">
          <TabsList className="w-full grid grid-cols-4 gap-1 bg-transparent">
            <TabsTrigger value="default">
              <FaGlobe className="size-4" />
            </TabsTrigger>
            <TabsTrigger value="twitter">
              <BsTwitterX className="size-4" />
            </TabsTrigger>
            <TabsTrigger value="linkedin">
              <FaLinkedin className="size-4" />
            </TabsTrigger>
            <TabsTrigger value="facebook">
              <FaFacebook className="size-4" />
            </TabsTrigger>
          </TabsList>
          {loading ? (
            <div className="mt-4 space-y-4">
              <Skeleton className="w-full h-48" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : (
            <>
              <TabsContent value="default">
                <WebPreview
                  title={metadata?.title || "No Title"}
                  description={metadata?.description || "No Description"}
                  image={metadata?.image}
                  loading={loading}
                />
              </TabsContent>
              <TabsContent value="twitter">
                <XPreview
                  title={metadata?.title || "No Title"}
                  image={metadata?.image}
                  loading={loading}
                />
              </TabsContent>
              <TabsContent value="linkedin">
                <LinkedInPreview
                  url={url}
                  title={metadata?.title || "No Title"}
                  image={metadata?.image}
                  loading={loading}
                />
              </TabsContent>
              <TabsContent value="facebook">
                <FacebookPreview
                  title={metadata?.title || "No Title"}
                  description={metadata?.description || "No Description"}
                  image={metadata?.image}
                  loading={loading}
                />
              </TabsContent>
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LinkPreview;
