"use client";

import { useState } from "react";

import { CheckIcon, CopyIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@clikz/ui/components/ui/button";
import { Input } from "@clikz/ui/components/ui/input";
import { cn } from "@clikz/ui/lib/utils";

type InputWithCopyProps = {
  value: string;
  readOnly?: boolean;
  className?: string;
};

const InputWithCopy = ({ value, readOnly, className }: InputWithCopyProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 500);
  };

  return (
    <div className={cn("flex w-full", className)} onClick={copyToClipboard}>
      <Input
        readOnly={readOnly}
        disabled={!readOnly}
        defaultValue={value}
        className="font-mono text-sm rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button
        onClick={copyToClipboard}
        variant="secondary"
        className="px-3 rounded-l-none"
      >
        {isCopied ? (
          <CheckIcon className="size-5" />
        ) : (
          <CopyIcon className="size-5" />
        )}
        <span className="sr-only">Copy ID</span>
      </Button>
    </div>
  );
};
export default InputWithCopy;
