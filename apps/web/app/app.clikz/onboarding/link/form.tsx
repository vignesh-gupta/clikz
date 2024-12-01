"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dices, Loader2 } from "lucide-react";
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

import { createLink } from "~/lib/actions/link";
import { generateRandomSlug } from "~/lib/utils/generate";
import { LinkSchema, linkSchema } from "~/lib/zod-schemas";

import LinkPreview from "./link-preview";

const CreateLinkForm = () => {
  const [isLoading, startTransaction] = useTransition();

  const searchParams = useSearchParams();
  const workspaceSlug = searchParams.get("workspaceId");

  const router = useRouter();

  const form = useForm<LinkSchema>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      destination: "",
      slug: "",
    },
  });

  const destination = form.watch("destination");

  const onSubmit = (values: LinkSchema) => {
    startTransaction(async () => {
      const data = await createLink(values, workspaceSlug);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
        router.push("done");
      }
    });
  };

  const onGenerateRandomSlug = () => {
    form.setValue("slug", generateRandomSlug());
  };

  return (
    <Card className="bg-transparent border-0 text-gray-800">
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.example.com" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs ml-2" />
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
                      variant="ghost"
                      type="button"
                      size="sm"
                      className="size-6 mr-2"
                      onClick={onGenerateRandomSlug}
                    >
                      <Dices className="h-4 w-4" />
                    </Button>
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

            <LinkPreview url={destination} />
            <Button type="submit" className="w-full mt-6" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Link"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateLinkForm;
