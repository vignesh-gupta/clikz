"use client";

import { useState } from "react";

import { Check, Copy } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";
import { Card, CardContent } from "@clikz/ui/components/ui/card";
import { Input } from "@clikz/ui/components/ui/input";
import { Label } from "@clikz/ui/components/ui/label";
import { Separator } from "@clikz/ui/components/ui/separator";

import WorkspaceAvatar from "~/features/workspace/components/workspace-avatar";
import { DB_PREFIX } from "~/lib/constants";

import DeleteWorkspace from "./delete-workspace";

type GeneralSettingsProps = {
  workspaceId: string;
  slug: string;
  name: string;
};

const GeneralSettings = ({ name, slug, workspaceId }: GeneralSettingsProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`ws_${workspaceId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-2 p-4">
          <Label htmlFor="slug">Workspace Slug</Label>
          <Input
            id="name"
            readOnly
            value={name}
            placeholder="your-workspace-slug"
            className="w-full"
          />
          <p className="text-sm text-muted-foreground">
            Only lowercase letters, numbers, and dashes. Max 48 characters.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 p-4">
          <Label htmlFor="slug">Workspace Slug</Label>
          <Input
            id="slug"
            readOnly
            value={slug}
            placeholder="your-workspace-slug"
            className="w-full"
          />
          <p className="text-sm text-muted-foreground">
            Only lowercase letters, numbers, and dashes. Max 48 characters.
          </p>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardContent className="space-y-2 p-4">
          <Label>Workspace Logo</Label>
          <div className="flex items-center gap-4">
            <div className="relative size-24 rounded-full border-2">
              <WorkspaceAvatar name={slug} className="size-full" />
              <input
                type="file"
                className="absolute inset-0 size-full opacity-0 cursor-pointer"
                accept="image/png,image/jpeg"
              />
            </div>
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
        <CardContent className="space-y-2 p-4">
          <Label>Workspace ID</Label>
          <div className="flex w-full">
            <Input
              disabled
              defaultValue={`${DB_PREFIX.WORKSPACE}${workspaceId}`}
              className="rounded-r-none font-mono text-sm"
            />
            <Button
              onClick={copyToClipboard}
              variant="secondary"
              className="rounded-l-none px-3"
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
