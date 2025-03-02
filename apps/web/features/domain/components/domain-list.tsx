import { DomainProp } from "~/lib/types";

import DomainCard from "./domain-card";

interface DomainListProps {
  domains: DomainProp[];
  // eslint-disable-next-line no-unused-vars
  onUpdateStatus: (domainId: string, status: DomainProp["status"]) => void;
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
