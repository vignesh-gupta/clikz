import {
  CopyIcon,
  GlobeIcon,
  MenuIcon,
  RefreshCw,
  SettingsIcon,
} from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";

import { DomainProp } from "~/lib/types";

type DomainCardProps = {
  domain: DomainProp;
};

const DomainCard = ({ domain }: DomainCardProps) => {
  const getDomainName = (value: string) => {
    const splitValue = value.split(".");

    return splitValue.length > 2 ? splitValue.slice(1).join(".") : value;
  };

  return (
    <div key={domain.id} className="p-4 md:p-6">
      <div className="space-y-4">
        {/* Domain header with actions */}
        <div className="flex items-center justify-between">
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
              {domain.status === "VERIFIED" ? "Verified" : "Pending"}
            </div>

            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="size-8 rounded-full"
              >
                <SettingsIcon />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8 rounded-full"
              >
                <RefreshCw />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8 rounded-full"
              >
                <MenuIcon />
              </Button>
            </div>
          </div>
        </div>

        {/* Verification instructions */}
        {domain.status === "PENDING" && domain.DomainVerification.length > 0 ? (
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
                  {domain.DomainVerification.map((record) => (
                    <tr key={record.type + record.value + record.domain}>
                      <td className="p-2">{record.type}</td>
                      <td className="p-2 font-mono">{record.domain}</td>
                      <td className="flex items-center gap-2 p-2">
                        <span className="font-mono text-xs">
                          {record.value}
                        </span>
                        <Button variant="ghost" size="icon" className="w-6 h-6">
                          <CopyIcon />
                        </Button>
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
