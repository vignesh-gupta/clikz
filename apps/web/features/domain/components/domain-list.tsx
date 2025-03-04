import { DomainProp } from "~/lib/types";

import DomainCard from "./domain-card";

interface DomainListProps {
  domains: DomainProp[];
}

export function DomainList({ domains }: DomainListProps) {
  return (
    <div className="divide-y">
      {domains.map((domain) => (
        <DomainCard key={domain.id} domain={domain} />
      ))}
    </div>
  );
}
