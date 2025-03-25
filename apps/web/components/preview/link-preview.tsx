"use client";

import { useEffect, useTransition } from "react";

import { CrownIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaGlobe, FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

import { Card, CardContent, CardHeader } from "@clikz/ui/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@clikz/ui/components/ui/form";
import { Skeleton } from "@clikz/ui/components/ui/skeleton";
import { Switch } from "@clikz/ui/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@clikz/ui/components/ui/tabs";

import { useLinkModel } from "~/features/link/hooks/use-link-modal";
import { getUrlWithoutUTMParams } from "~/lib/utils/url";
import { LinkSchema } from "~/lib/zod/schemas";

import {
  FacebookPreview,
  LinkedInPreview,
  WebPreview,
  XPreview,
} from "./social-preview";

type LinkPreviewProps = {
  url: string;
};

const LinkPreview = ({ url }: LinkPreviewProps) => {
  const [loading, startTransaction] = useTransition();
  const { linkId } = useLinkModel();
  const form = useFormContext<LinkSchema>();

  const [title, description, image] = form.watch([
    "title",
    "description",
    "image",
  ]);

  const [debouncedUrl] = useDebounce(getUrlWithoutUTMParams(url), 500);

  useEffect(() => {
    if (!debouncedUrl || linkId !== "new") return;

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
          form.setValue("title", data?.title ?? "No title");
          form.setValue("description", data?.description ?? "No description");
          form.setValue("image", data?.image ?? "");
        })
        .catch(() => {
          toast.error("Failed to fetch metadata");
        })
    );
  }, [debouncedUrl]);

  return (
    <Card className="w-full max-w-md overflow-hidden bg-transparent border-0">
      <CardHeader className="p-0 flex-row justify-between items-center">
        <FormField
          control={form.control}
          name="proxy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm flex-1 px-1 py-0">
              <FormLabel>Custom Preview</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-0"
                  icon={<CrownIcon className="size-3" />}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </CardHeader>
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
                  title={title || "No Title"}
                  description={description || "No Description"}
                  image={image}
                  loading={loading}
                />
              </TabsContent>
              <TabsContent value="twitter">
                <XPreview
                  title={title || "No Title"}
                  image={image}
                  loading={loading}
                />
              </TabsContent>
              <TabsContent value="linkedin">
                <LinkedInPreview
                  url={url}
                  title={title || "No Title"}
                  image={image}
                  loading={loading}
                />
              </TabsContent>
              <TabsContent value="facebook">
                <FacebookPreview
                  title={title || "No Title"}
                  description={description || "No Description"}
                  image={image}
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
