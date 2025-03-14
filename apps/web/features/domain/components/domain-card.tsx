"use client";

import { Domain } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { GlobeIcon, RefreshCwIcon, TrashIcon } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";
import { cn } from "@clikz/ui/lib/utils";

import InputWithCopy from "~/components/input-with-copy";
import { QUERY_KEYS } from "~/lib/constants";

import { useDeleteDomain } from "../api/use-delete-domain";
import { useGetDomainStatus } from "../api/use-domain-status";

type DomainCardProps = {
  domain: Domain;
};

const DomainCard = ({ domain }: DomainCardProps) => {
  const queryClient = useQueryClient();

  const { data: domainStatus, isLoading } = useGetDomainStatus({
    id: domain.id,
    domain: domain.name,
    currentStatus: domain.status,
  });

  const { mutate: deleteDomain, isPending: isDeleting } = useDeleteDomain();

  const getDomainName = (value: string) => {
    const splitValue = value.split(".");

    return splitValue.length > 2 ? splitValue.slice(1).join(".") : value;
  };

  const updateDomainStatus = (id: string, name: string) =>
    queryClient.invalidateQueries({
      queryKey: [...QUERY_KEYS.DOMAIN, id, name],
    });

  return (
    <div key={domain.id} className="p-4 md:p-6">
      <div className="space-y-4">
        {/* Domain header with actions */}
        <div className="flex items-center justify-between flex-wrap gap-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 border rounded-full">
              <GlobeIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{domain.name}</span>
                <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                  Primary
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                No redirect configured
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700">
              {domainStatus.status === "VERIFIED" ? "Verified" : "Pending"}
            </div>

            <div className="flex gap-1">
              {domain.status !== "VERIFIED" && (
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 rounded-full"
                  onClick={() => updateDomainStatus(domain.id, domain.name)}
                  disabled={isLoading || isDeleting}
                >
                  <RefreshCwIcon className={cn(isLoading && "animate-spin")} />
                </Button>
              )}
              <Button
                variant="outline"
                size="icon"
                className="size-8 rounded-full bg-destructive/10 text-destructive/50"
                onClick={() => deleteDomain({ id: domain.id })}
                disabled={isDeleting}
              >
                <TrashIcon />
              </Button>
            </div>
          </div>
        </div>

        {/* Verification instructions*/}

        {domainStatus.status === "PENDING" &&
        domainStatus.verifications.length > 0 ? (
          <div className="space-y-4">
            <p className="text-sm">
              Please set the following record(s) on{" "}
              <span className="font-mono">{getDomainName(domain.name)}</span> to
              prove ownership of{" "}
              <span className="font-mono">{domain.name}</span>:
            </p>

            <div className="overflow-hidden border rounded">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-2 font-medium text-left">Type</th>
                    <th className="p-2 font-medium text-left">Name</th>
                    <th className="p-2 font-medium text-left">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {domainStatus.verifications.map((record) => (
                    <tr key={record.type + record.value + record.domain}>
                      <td className="p-2">{record.type}</td>
                      <td className="p-2 font-mono">
                        <InputWithCopy
                          value={record.domain}
                          className="w-auto"
                          readOnly
                        />
                      </td>
                      <td className="flex items-center gap-2 p-2">
                        <InputWithCopy value={record.value} readOnly />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DomainCard;
