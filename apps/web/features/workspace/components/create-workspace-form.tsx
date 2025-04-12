"use client";

import Image from "next/image";
import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@clikz/ui/components/ui/button";
import { Card, CardContent, CardHeader } from "@clikz/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@clikz/ui/components/ui/form";
import { Input } from "@clikz/ui/components/ui/input";

import { createWorkspace } from "~/lib/actions/workspace";
import { WorkspaceSchema, workspaceSchema } from "~/lib/zod/schemas";

import { useWorkspaceModel } from "../hooks/use-workspace-modal";
import WorkspaceSlugField from "./workspace-slug-field";

const CreateWorkspaceForm = () => {
  const [isLoading, startTransaction] = useTransition();
  const [isSlugAvailable, setSlugAvailable] = useState<boolean>(false);

  const { close } = useWorkspaceModel();

  const form = useForm<WorkspaceSchema>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const onSubmit = async (values: WorkspaceSchema) => {
    startTransaction(async () => {
      toast.promise(createWorkspace(values), {
        loading: "Creating your workspace...",
        success: () => {
          close();
          return "Workspace created successfully!";
        },
        error: (error) => {
          return error.message;
        },
      });
    });

    setSlugAvailable(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-0">
      <CardHeader className="gap-y-3 flex items-center justify-center flex-col">
        <Image src="/logo-name.png" width={150} height={40} alt="Clikz Logo" />

        <p className="text-xl font-semibold">Create a new workspace</p>
      </CardHeader>
      <CardContent>
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
    </Card>
  );
};

export default CreateWorkspaceForm;
