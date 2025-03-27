"use client";

import { useState } from "react";

import { toast } from "sonner";

import { CopyButton } from "@clikz/ui/components/copy-button";
import { Input } from "@clikz/ui/components/ui/input";
import { cn } from "@clikz/ui/lib/utils";

type InputWithCopyProps = {
  value: string;
  readOnly?: boolean;
  className?: string;
};

const InputWithCopy = ({ value, readOnly, className }: InputWithCopyProps) => {
  const [, setIsCopied] = useState(false);

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
      <CopyButton
        variant="secondary"
        value={value}
        className="px-3 rounded-l-none"
      />
    </div>
  );
};
export default InputWithCopy;
