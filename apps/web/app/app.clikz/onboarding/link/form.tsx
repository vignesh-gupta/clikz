"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dices, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

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
import { Label } from "@clikz/ui/components/ui/label";

import LinkPreview from "~/components/preview/link-preview";
import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";
import { createLink } from "~/lib/actions/link";
import { BASE_DOMAIN } from "~/lib/constants";
import { generateRandomSlug } from "~/lib/utils/generate";
import { LinkSchema, linkSchema } from "~/lib/zod-schemas";

const CreateLinkForm = () => {
  const [slugAvailable, setSlugAvailable] = useState(false);
  const [isLoading, startTransaction] = useTransition();

  const workspaceSlug = useWorkspaceSlug();
  const router = useRouter();

  const form = useForm<LinkSchema>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      destination: "",
      slug: "",
    },
  });

  const [destination, slug] = form.watch(["destination", "slug"]);

  const [debouncedSlug] = useDebounce(slug, 500);

  useEffect(() => {
    if (!debouncedSlug) return;
    setSlugAvailable(false);
    const controller = new AbortController();
    fetch(`/api/links/${debouncedSlug}/exist`, {
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch metadata");
        }
        const data = await res.json();
        setSlugAvailable(!data.exists);
      })
      .catch(() => setSlugAvailable(false));
  }, [debouncedSlug]);

  useEffect(() => {}, []);

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
                      className="size-6"
                      onClick={onGenerateRandomSlug}
                    >
                      <Dices className="size-4" />
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
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs ml-2" />
                </FormItem>
              )}
            />

            <div>
              <Label>Preview</Label>
              <LinkPreview url={destination} />
            </div>
            <Button
              type="submit"
              className="w-full mt-3"
              disabled={isLoading || !slugAvailable}
            >
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
