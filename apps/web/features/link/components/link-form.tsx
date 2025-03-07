"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { LinkSchema, linkSchema } from "~/lib/zod-schemas";

import { useCreateLink } from "../api/use-create-link";
import { useGetLink } from "../api/use-get-link";
import { useUpdateLink } from "../api/use-update-link";
import { useLinkModel } from "../hooks/use-link-modal";
import LinkFormSlug from "./link-form-slug";

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
      domain: linkData?.domain ?? "",
    },
  });

  const destination = form.watch("destination");
  const slug = form.watch("slug");

  const onSubmit = async (value: LinkSchema) => {
    if (!linkId) return toast.error("Link ID is missing");
    console.log({ value });

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
                    <LinkFormSlug
                      field={field}
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
