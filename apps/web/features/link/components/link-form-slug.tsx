"use client";

import { useLayoutEffect, useState } from "react";

import { Domain } from "@prisma/client";
import { DicesIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button } from "@clikz/ui/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@clikz/ui/components/ui/form";
import { Input } from "@clikz/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@clikz/ui/components/ui/select";
import { Skeleton } from "@clikz/ui/components/ui/skeleton";

import { useGetDomains } from "~/features/domain/api/use-get-domains";
import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";
import { BASE_DOMAIN } from "~/lib/constants";
import { generateRandomSlug } from "~/lib/utils/generate";

type LinkFormSlugProps = {
  disabled?: boolean;
};

const LinkFormSlug = ({ disabled }: LinkFormSlugProps) => {
  const form = useFormContext();
  const workspaceSlug = useWorkspaceSlug();
  const { data: domains, isLoading } = useGetDomains({
    workspaceSlug,
    verified: true,
  });

  const onGenerateRandomSlug = () => {
    form.setValue("slug", generateRandomSlug());
  };

  return (
    <FormItem>
      <div className="flex justify-between items-center">
        <FormLabel>Short Link</FormLabel>
        <Button
          disabled={disabled}
          variant="ghost"
          type="button"
          size="sm"
          className="size-6"
          onClick={onGenerateRandomSlug}
        >
          <DicesIcon className="size-4" />
        </Button>
      </div>
      <FormControl>
        <div className="flex w-full">
          {isLoading || !domains ? (
            <Skeleton className="w-[150px] rounded-r-none" />
          ) : (
            <DomainDropdown domains={domains} disabled={!!disabled} />
          )}
          <Input
            {...form.register("slug")}
            disabled={disabled}
            placeholder="(optional)"
            className="rounded-l-none focus-visible:ring-offset-1 flex-1"
          />
        </div>
      </FormControl>
      <FormMessage className="text-xs ml-2" />
    </FormItem>
  );
};

export default LinkFormSlug;

const DomainDropdown = ({
  domains,
  disabled,
}: {
  domains: Domain[];
  disabled: boolean;
}) => {
  const form = useFormContext();

  const currentDomain = (form.getValues().domain as string) || "";

  const [selectedDomain, setSelectedDomain] = useState<string>(
    currentDomain ?? domains[0]?.name ?? BASE_DOMAIN
  );

  useLayoutEffect(() => {
    if (domains.length > 0 && form.getValues().domain === "")
      form.setValue("domain", domains[0]?.name ?? BASE_DOMAIN);
  }, [domains]);

  const onDomainChange = (value: string) => {
    form.setValue("domain", value);
    setSelectedDomain(value);
  };

  return (
    <Select
      value={selectedDomain}
      onValueChange={onDomainChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-[150px] rounded-r-none">
        <SelectValue placeholder="Select domain" className="truncate" />
      </SelectTrigger>
      <SelectContent>
        {domains.map((domain) => (
          <SelectItem key={domain.name} value={domain.name}>
            {domain.name}
          </SelectItem>
        ))}
        <SelectItem value={BASE_DOMAIN}>{BASE_DOMAIN}</SelectItem>
      </SelectContent>
    </Select>
  );
};
