"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@clikz/ui/components/ui/alert";
import { Button } from "@clikz/ui/components/ui/button";
import { Card, CardContent, CardFooter } from "@clikz/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@clikz/ui/components/ui/form";
import { Input } from "@clikz/ui/components/ui/input";

import WorkspaceSlugField from "~/features/workspace/components/workspace-slug-field";
import { createWorkspace } from "~/lib/actions/onboarding";
import { WorkspaceSchema, workspaceSchema } from "~/lib/zod-schemas";

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

  const onSubmit = (values: WorkspaceSchema) => {
    startTransaction(async () => {
      const res = await createWorkspace(values);

      if (res.error) {
        setError(res.error);
      } else if (res.success) {
        router.push(`/onboarding/invite?workspace=${values.slug}`);
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
                    <Input
                      placeholder="My Awesome Workspace"
                      className="focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs ml-2" />
                </FormItem>
              )}
            />
            <WorkspaceSlugField setSlugAvailable={setSlugAvailable} />
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
