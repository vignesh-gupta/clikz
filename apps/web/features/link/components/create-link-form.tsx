"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { DicesIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@clikz/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@clikz/ui/components/ui/card";
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
import { createLink } from "~/lib/actions/link";
import { generateRandomSlug } from "~/lib/utils/generate";
import { LinkSchema, linkSchema } from "~/lib/zod-schemas";

import { useCreateLinkModel } from "../hooks/use-create-link-modal";

const CreateLinkForm = () => {
  const [isLoading, startTransaction] = useTransition();
  const router = useRouter();

  const workspace = useWorkspaceSlug();
  const { close } = useCreateLinkModel();

  const form = useForm<LinkSchema>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      destination: "",
      slug: "",
      comment: "",
    },
  });

  const { watch } = form;

  const destination = watch("destination");
  const slug = watch("slug");

  const onSubmit = async (value: LinkSchema) => {
    startTransaction(async () => {
      const data = await createLink(value, workspace);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
        router.refresh();
        close();
      }
    });
  };

  const onGenerateRandomSlug = () => {
    form.setValue("slug", generateRandomSlug());
  };

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Create Link</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
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
                        <Input placeholder="https://example.com" {...field} />
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
                          disabled={isLoading}
                          variant="ghost"
                          type="button"
                          size="sm"
                          className="size-6"
                          iconWrapperClassName="mr-0"
                          onClick={onGenerateRandomSlug}
                          icon={<DicesIcon className="size-4 mr-0" />}
                        />
                      </div>
                      <FormControl className="flex">
                        <div className="flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            clikz.com/
                          </span>
                          <Input
                            placeholder="(optional)"
                            className="focus-visible:ring-gray-400 focus-visible:ring-offset-1"
                            {...field}
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <QRPreview slug={slug} />
                <LinkPreview url={destination} />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              Create Link
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateLinkForm;
