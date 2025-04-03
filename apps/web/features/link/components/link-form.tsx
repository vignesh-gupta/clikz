"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@clikz/ui/components/ui/button";
import { Card, CardContent } from "@clikz/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@clikz/ui/components/ui/form";
import { Input } from "@clikz/ui/components/ui/input";
import { Textarea } from "@clikz/ui/components/ui/textarea";

import LinkPreview from "~/components/preview/link-preview";
import QRPreview from "~/components/preview/qr-preview";
import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";
import { BASE_DOMAIN } from "~/lib/constants";
import { LinkSchema, linkSchema } from "~/lib/zod/schemas";

import { useCreateLink } from "../api/use-create-link";
import { useGetLink } from "../api/use-get-link";
import { useUpdateLink } from "../api/use-update-link";
import { useLinkModel } from "../hooks/use-link-modal";
import LinkFormSlug from "./link-form-slug";

const LinkForm = () => {
  const workspaceSlug = useWorkspaceSlug();
  const { close, linkId } = useLinkModel();

  const { data: linkData, isLoading } = useGetLink({ linkId });
  const { mutateAsync: createLink, isPending: isCreating } = useCreateLink();
  const { mutateAsync: updateLink, isPending: isUpdating } = useUpdateLink();

  const form = useForm<LinkSchema>({
    resolver: zodResolver(linkSchema),
    values: {
      destination: linkData?.url ?? "",
      slug: linkData?.key ?? "",
      comment: linkData?.comment ?? "",
      domain: linkData?.domain ?? BASE_DOMAIN ?? "",
      proxy: linkData?.proxy ?? false,
      title: linkData?.title ?? "No title",
      description: linkData?.description ?? "No description",
      image: linkData?.image ?? "",
      video: linkData?.video ?? "",
    },
  });

  const [destination, slug, domain] = form.watch([
    "destination",
    "slug",
    "domain",
  ]);

  const onSubmit = (value: LinkSchema) => {
    if (!linkId) return toast.error("Link ID is missing");

    const isNew = linkId === "new";

    let res: Promise<any>;

    if (isNew)
      res = createLink({
        json: value,
        query: { workspaceSlug },
      });
    else
      res = updateLink({
        json: value,
        query: { workspaceSlug },
        param: { linkId },
      });

    res.then(() => close());
  };

  return (
    <Card className="p-0 border-0 rounded-xl">
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="col-span-2 space-y-4">
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={() => (
                    <LinkFormSlug
                      disabled={isLoading || isUpdating || isCreating}
                    />
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="marketing, campaign" {...field} />
                      </FormControl>
                      <FormDescription>
                        Separate tags with commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add any additional notes here"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-center space-y-4">
                <QRPreview slug={slug} domain={domain} />
                <LinkPreview url={destination} />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || isCreating || isUpdating}
            >
              {isCreating || isUpdating ? (
                <Loader2 className="size-4 animate-spin" />
              ) : null}
              {linkId === "new" ? "Create" : "Update"} Link
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LinkForm;
