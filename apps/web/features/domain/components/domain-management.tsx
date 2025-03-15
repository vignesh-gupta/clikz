"use client";

import { useState } from "react";

import { Domain } from "@prisma/client";
import { ChevronDownIcon, SearchIcon } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";
import { Input } from "@clikz/ui/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@clikz/ui/components/ui/tabs";

import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";
import { FetchParamsSchema } from "~/lib/zod-schemas";

import { useGetDomains } from "../api/use-get-domains";
import { AddDomainDialog } from "./add-domain-dialog";
import { DomainList } from "./domain-list";

type DomainManagementProps = FetchParamsSchema & {
  initialDomains: Domain[];
};

export function DomainManagement({
  initialDomains,
  limit,
  page,
}: DomainManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDomainOpen, setIsAddDomainOpen] = useState(false);

  const workspaceSlug = useWorkspaceSlug();

  const { data: domains, isLoading } = useGetDomains({
    workspaceSlug,
    initialDomains,
    limit,
    page,
  });

  return (
    <div className="space-y-6">
      <div className="flex lg:items-center justify-between flex-col lg:flex-row">
        <h1 className="text-2xl font-bold">Domains</h1>
        <div className="flex sm:items-center gap-3 sm:flex-row flex-wrap">
          <Input
            placeholder="Search..."
            className="pl-9 max-w-[240px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<SearchIcon className="size-4" />}
          />
          <Tabs
            defaultValue="active"
            className="w-auto"
            // onValueChange={(value) => setFilter(value as "active" | "archived")}
          >
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={() => setIsAddDomainOpen(true)}>
            Add domain
            <ChevronDownIcon />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <DomainList domains={domains} isLoading={isLoading} />
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>Viewing {domains?.length} domains</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={true}>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled={true}>
            Next
          </Button>
        </div>
      </div>

      <AddDomainDialog
        open={isAddDomainOpen}
        onOpenChange={setIsAddDomainOpen}
      />
    </div>
  );
}
