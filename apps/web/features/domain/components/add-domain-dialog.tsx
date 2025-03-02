/* eslint-disable no-unused-vars */
"use client";

import type React from "react";
import { useState } from "react";

import { AlertCircle } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@clikz/ui/components/ui/dialog";
import { Input } from "@clikz/ui/components/ui/input";
import { Label } from "@clikz/ui/components/ui/label";

import { DomainProp } from "~/lib/types";

/* eslint-disable no-unused-vars */

/* eslint-disable no-unused-vars */

/* eslint-disable no-unused-vars */

interface AddDomainDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddDomain: (
    domain: Omit<DomainProp, "id" | "createdAt" | "updatedAt">
  ) => void;
  domains: DomainProp[];
}

export function AddDomainDialog({
  open,
  onOpenChange,
  onAddDomain,
  domains,
}: AddDomainDialogProps) {
  const [domainName, setDomainName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateDomain = (domain: string) => {
    // Basic domain validation regex
    const domainRegex =
      /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
    return domainRegex.test(domain);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!domainName.trim()) {
      setError("Domain name is required");
      return;
    }

    if (!validateDomain(domainName)) {
      setError("Please enter a valid domain name (e.g., example.com)");
      return;
    }

    // In a real app, this would be an API call
    onAddDomain({
      name: domainName,
      status: "VERIFIED",
      verification: [
        {
          type: "TXT",
          domain: domainName,
          value: "random-value",
          reason: "Pending verification",
        },
      ],
      expiredUrl: null,
      logo: null,
      workspaceId: "workspace-id",
      notFoundUrl: null,
      placeholder: null,
      workspaceSlug: "workspace-slug",
      isArchived: false,
    });

    // Reset form and close dialog
    setDomainName("");
    setError(null);
    onOpenChange(false);
  };

  const handleClose = () => {
    setDomainName("");
    setError(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Domain</DialogTitle>
          <DialogDescription>
            Enter a domain name to add to your workspace.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="domain-name">Domain Name</Label>
              <Input
                id="domain-name"
                placeholder="example.com"
                value={domainName}
                onChange={(e) => {
                  setDomainName(e.target.value);
                  setError(null);
                }}
                className={error ? "border-destructive" : ""}
              />
              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Add Domain</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
