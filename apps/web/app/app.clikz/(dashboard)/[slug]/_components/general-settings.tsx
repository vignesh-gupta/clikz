"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Copy } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@clikz/ui/components/ui/button";
import { Card, CardContent } from "@clikz/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@clikz/ui/components/ui/form";
import { Input } from "@clikz/ui/components/ui/input";
import { Label } from "@clikz/ui/components/ui/label";
import { Separator } from "@clikz/ui/components/ui/separator";

import { useUpdateWorkspace } from "~/features/workspace/api/workspace/use-update-workspace";
import WorkspaceIconUpload from "~/features/workspace/components/workspace-icon-upload";
import { DATA_PREFIX } from "~/lib/constants";
import { WorkspaceSchema, workspaceSchema } from "~/lib/zod-schemas";

import DeleteWorkspace from "./delete-workspace";

type GeneralSettingsProps = {
  workspaceId: string;
  slug: string;
  name: string;
  icon?: string;
};

const GeneralSettings = ({
  name,
  slug,
  workspaceId,
  icon,
}: GeneralSettingsProps) => {
  const [copied, setCopied] = useState(false);

  const form = useForm<WorkspaceSchema>({
    resolver: zodResolver(workspaceSchema),
    values: {
      name,
      slug,
    },
  });

  const { mutate: updateWorkspace } = useUpdateWorkspace();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`ws_${workspaceId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 500);
  };

  const onSubmit = (values: WorkspaceSchema) =>
    updateWorkspace({ json: values, param: { workspaceId } });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:items-center md:justify-between md:flex-row">
        <div>
          <h2 className="text-lg font-semibold">General Setting</h2>
          <p className="text-sm text-muted-foreground">
            Manage your workspace settings
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      Only lowercase letters, numbers. Max 48 characters.
                    </p>
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <FormLabel>Workspace Slug</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      Only lowercase letters, numbers, and dashes. Max 48
                      characters.
                    </p>
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />
          <Button type="submit">Save</Button>
        </form>
      </Form>

      <Separator />

      <Card>
        <CardContent className="p-4 space-y-2">
          <Label>Workspace Logo</Label>
          <div className="flex items-center gap-4">
            <WorkspaceIconUpload
              slug={slug}
              workspaceId={workspaceId}
              icon={icon}
            />
            <div className="text-sm text-muted-foreground">
              <p>
                Square image recommended. Accepted file types: .png, .jpg with
                max size 2MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardContent className="p-4 space-y-2">
          <Label>Workspace ID</Label>
          <div className="flex w-full">
            <Input
              disabled
              defaultValue={`${DATA_PREFIX.WORKSPACE}${workspaceId}`}
              className="font-mono text-sm rounded-r-none"
            />
            <Button
              onClick={copyToClipboard}
              variant="secondary"
              className="px-3 rounded-l-none"
            >
              {copied ? (
                <Check className="size-5" />
              ) : (
                <Copy className="size-5" />
              )}
              <span className="sr-only">Copy ID</span>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Used to identify your workspace when interacting with the Clikz API
          </p>
        </CardContent>
      </Card>

      <Separator />

      <DeleteWorkspace workspaceId={workspaceId} />
    </div>
  );
};

export default GeneralSettings;
