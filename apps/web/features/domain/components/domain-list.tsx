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

  return (
    <div className="divide-y">
      {domains.map((domain) => (
        <DomainCard key={domain.id} domain={domain} />
      ))}
    </div>
  );
}
