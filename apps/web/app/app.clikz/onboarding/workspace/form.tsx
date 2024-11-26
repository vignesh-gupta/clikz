"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/ui/alert";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardFooter } from "@repo/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { useForm, useWatch } from "react-hook-form";

import { createWorkspace } from "~/lib/actions/onboarding";
import { textToSlug } from "~/lib/utils";
import { workspaceSchema, WorkspaceSchema } from "~/lib/zod-schemas";

const WorkspaceForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, startTransaction] = useTransition();
  const [isSlugAvailable, setSlugAvailable] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<WorkspaceSchema>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const name = useWatch({ control: form.control, name: "name" });
  const slug = useWatch({ control: form.control, name: "slug" });

  useEffect(() => {
    form.setValue("slug", textToSlug(name)); // Automatically update the slug field
  }, [name]);

  useEffect(() => {
    form.setValue("slug", textToSlug(slug)); // Automatically update the slug field
  }, [slug]);

  const checkSlug = async (slug: string) => {
    const data = await fetch(`/api/workspace/${slug}/exist`).then((res) =>
      res.json(),
    );

    if (data.exists) {
      form.setError("slug", {
        type: "manual",
        message: `The slug "${slug}" is already taken`,
      });
    } else {
      setSlugAvailable(true);
      if (
        form.formState.errors.slug &&
        form.formState.errors.slug.type === "manual"
      ) {
        form.clearErrors("slug");
      }
    }
  };

  const onSubmit = (values: WorkspaceSchema) => {
    startTransaction(async () => {
      const res = await createWorkspace(values);

      if (res.error) {
        setError(res.error);
      } else if (res.success) {
        router.push("/onboarding/invite?workspaceId=" + values.slug);
      }

      setSlugAvailable(false);
    });
  };

  return (
    <Card className="bg-transparent border-0 text-gray-800">
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Workspace" {...field} />
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
                  <FormLabel>Workspace Slug</FormLabel>
                  <FormControl className="flex">
                    <div className="flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        app.clikz.com/
                      </span>
                      <Input
                        placeholder="my-workspace"
                        className="focus-visible:ring-gray-400 focus-visible:ring-offset-1"
                        {...field}
                        onBlur={() => checkSlug(slug)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs ml-2" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full mt-6"
              disabled={isLoading || !isSlugAvailable}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Workspace"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
};

export default WorkspaceForm;
