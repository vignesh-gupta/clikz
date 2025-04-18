import { Domain } from "@prisma/client";

import { Skeleton } from "@clikz/ui/components/ui/skeleton";

import DomainCard from "./domain-card";

interface DomainListProps {
  domains?: Domain[];
  isLoading?: boolean;
}

export function DomainList({ domains, isLoading }: DomainListProps) {
  if (isLoading || !domains) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </div>
    );
  }

  if (domains.length === 0) {
    return (
      <div className="flex items-center justify-center py-10 text-sm text-muted-foreground">
        No domains found
      </div>
    );
  }

  return (
    <div className="divide-y">
      {domains.map((domain) => (
        <DomainCard key={domain.id} domain={domain} />
      ))}
    </div>
  );
}
