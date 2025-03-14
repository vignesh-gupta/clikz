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

import { APP_DOMAIN } from "~/lib/constants";
import { getApexDomain } from "~/lib/utils/url";

import { useCreateDomain } from "../api/use-create-domain";

interface AddDomainDialogProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void;
}

export function AddDomainDialog({ open, onOpenChange }: AddDomainDialogProps) {
  const [domainName, setDomainName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: createDomain, isPending } = useCreateDomain();

  const validateDomain = (domain: string) => {
    const apexDomain = getApexDomain(domain);

    if (!apexDomain || apexDomain === APP_DOMAIN) {
      return false;
    }

    // Basic domain validation regex
    const domainRegex =
      /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
    return domainRegex.test(domain);
  };

  const handleClose = () => {
    setDomainName("");
    setError(null);
    onOpenChange(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!domainName.trim()) {
      setError("Domain name is required");
      return;
    }

    if (!validateDomain(domainName)) {
      setError("Please enter a valid domain name (e.g., example.com)");
      return;
    }

    await createDomain({
      slug: domainName,
    });

    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-lg">
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
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding Domain..." : "Add Domain"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
