"use client";

import { useState } from "react";

import { ChevronDownIcon, SearchIcon } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";
import { Input } from "@clikz/ui/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@clikz/ui/components/ui/tabs";

import { DomainProp } from "~/lib/types";

import { AddDomainDialog } from "./add-domain-dialog";
import { DomainList } from "./domain-list";
import { EmptyState } from "./empty-state";

export function DomainManagement() {
  const [domains, setDomains] = useState<DomainProp[]>([]);
  const [filter, setFilter] = useState<"active" | "archived">("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDomainOpen, setIsAddDomainOpen] = useState(false);

  const filteredDomains = domains.filter((domain) => {
    const matchesSearch = domain.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "active"; // In a real app, you'd have an archived property
    return matchesSearch && matchesFilter;
  });

  const addDomain = (
    domain: Omit<DomainProp, "id" | "createdAt" | "updatedAt">
  ) => {
    const newDomain: DomainProp = {
      ...domain,
      id: Math.random().toString(36).substring(2, 9),
      verification: [
        {
          type: "TXT",
          domain: domain.name,
          value: "some-random-value",
          reason: "DNS verification",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setDomains([...domains, newDomain]);
  };

  const updateDomainStatus = (id: string, status: DomainProp["status"]) => {
    setDomains(
      domains.map((domain) =>
        domain.id === id ? { ...domain, status } : domain
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex lg:items-center justify-between flex-col lg:flex-row">
        <h1 className="text-2xl font-bold">Domains</h1>
        <div className="flex sm:items-center gap-3 sm:flex-row flex-wrap">
          <div className="relative">
            <SearchIcon className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 " />
            <Input
              placeholder="Search..."
              className="pl-9 max-w-[240px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs
            defaultValue="active"
            className="w-auto"
            onValueChange={(value) => setFilter(value as "active" | "archived")}
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
        {domains.length > 0 ? (
          <DomainList
            domains={filteredDomains}
            onUpdateStatus={updateDomainStatus}
          />
        ) : (
          <EmptyState onAddDomain={() => setIsAddDomainOpen(true)} />
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>Viewing {filteredDomains.length} domains</div>
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
        onAddDomain={addDomain}
        domains={domains}
      />
    </div>
  );
}
