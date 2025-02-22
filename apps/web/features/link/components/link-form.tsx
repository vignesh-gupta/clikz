"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DicesIcon } from "lucide-react";
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
import { generateRandomSlug } from "~/lib/utils/generate";
import { LinkSchema, linkSchema } from "~/lib/zod-schemas";

import { useCreateLink } from "../api/use-create-link";
import { useGetLink } from "../api/use-get-link";
import { useUpdateLink } from "../api/use-update-link";
import { useLinkModel } from "../hooks/use-link-modal";

const LinkForm = () => {
  const workspaceSlug = useWorkspaceSlug();
  const { close, linkId } = useLinkModel();

  const { data: linkData, isLoading } = useGetLink({ linkId });
  const { mutate: createLink, isPending: isCreating } = useCreateLink();
  const { mutate: updateLink, isPending: isUpdating } = useUpdateLink();

  const form = useForm<LinkSchema>({
    resolver: zodResolver(linkSchema),
    values: {
      destination: linkData?.url ?? "",
      slug: linkData?.key ?? "",
      comment: linkData?.comment ?? "",
    },
  });

  const destination = form.watch("destination");
  const slug = form.watch("slug");

  const onSubmit = async (value: LinkSchema) => {
    if (!linkId) return toast.error("Link ID is missing");

    if (linkId === "new")
      createLink({
        json: value,
        query: { workspaceSlug },
      });
    else
      updateLink({
        json: value,
        query: { workspaceSlug },
        param: { linkId },
      });
    close();
  };

  const onGenerateRandomSlug = () => {
    form.setValue("slug", generateRandomSlug());
  };

  return (
    <Card className="rounded-xl border-0 p-0">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-4 col-span-2">
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
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>Short Link</FormLabel>
                        <Button
                          disabled={isLoading || isCreating || isUpdating}
                          variant="ghost"
                          type="button"
                          size="sm"
                          className="size-6"
                          onClick={onGenerateRandomSlug}
                        >
                          <DicesIcon className="size-4" />
                        </Button>
                      </div>
                      <FormControl className="flex">
                        <div className="flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            {`${BASE_DOMAIN}/`}
                          </span>
                          <Input
                            placeholder="(optional)"
                            className="focus-visible:ring-gray-400 focus-visible:ring-offset-1"
                            {...field}
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs ml-2" />
                    </FormItem>
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
              <div className="space-y-4 flex flex-col items-center">
                <QRPreview slug={slug} />
                <LinkPreview url={destination} />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || isCreating || isUpdating}
            >
              {linkId === "new" ? "Create" : "Update"} Link
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LinkForm;
