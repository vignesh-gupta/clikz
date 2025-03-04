"use client";

import { Globe } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";

interface EmptyStateProps {
  onAddDomain: () => void;
}

export function EmptyState({ onAddDomain }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 space-y-6">
        <div className="flex justify-center space-x-4">
          <div className="flex items-center p-4 border rounded-md">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <div className="w-32 h-2 ml-3 rounded-md bg-muted"></div>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <div className="flex items-center p-4 border rounded-md">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <div className="w-32 h-2 ml-3 rounded-md bg-muted"></div>
          </div>
        </div>
      </div>
      <h3 className="text-lg font-medium">No domains found</h3>
      <p className="max-w-md mt-2 text-sm text-muted-foreground">
        Use custom domains for better brand recognition
        <br />
        and click-through rates
      </p>
      <div className="flex gap-3 mt-6">
        <Button onClick={onAddDomain}>Add Domain</Button>
        <Button variant="outline">Learn more</Button>
      </div>
    </div>
  );
}
