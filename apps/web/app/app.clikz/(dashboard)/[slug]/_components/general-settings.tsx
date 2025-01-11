"use client";

import { useState } from "react";

import { Check, Copy, Upload } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@clikz/ui/components/ui/alert-dialog";
import { Button } from "@clikz/ui/components/ui/button";
import { Card, CardContent } from "@clikz/ui/components/ui/card";
import { Input } from "@clikz/ui/components/ui/input";
import { Label } from "@clikz/ui/components/ui/label";
import { Separator } from "@clikz/ui/components/ui/separator";

export default function GeneralSettings() {
  const [workspaceId] = useState("ws_ctte4m-kw000arsjrc15szj9");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(workspaceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-2 p-4">
          <Label htmlFor="slug">Workspace Slug</Label>
          <Input
            id="slug"
            placeholder="your-workspace-slug"
            className="max-w-md"
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
            <div className="relative h-24 w-24 rounded-full border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
              <Upload className="h-8 w-8 text-muted-foreground/25" />
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/png,image/jpeg"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Square image recommended. Accepted file types: .png, .jpg</p>
              <p>Max file size: 2MB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardContent className="space-y-2 p-4">
          <Label>Workspace ID</Label>
          <div className="flex max-w-md">
            <Input
              readOnly
              value={workspaceId}
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

      <Card className="border-destructive/45">
        <CardContent className="space-y-2 p-4">
          <h2 className="text-lg font-semibold text-destructive">
            Delete Workspace
          </h2>
          <p className="text-sm text-muted-foreground">
            Permanently delete your workspace, custom domain, and all associated
            links + their stats. This action cannot be undone - please proceed
            with caution.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Workspace</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your workspace and remove all associated data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete Workspace
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
