"use client";

import { useState } from "react";

import { CheckIcon, CopyIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@clikz/ui/components/ui/button";
import { Input } from "@clikz/ui/components/ui/input";

type InputWithCopyProps = {
  value: string;
};

const InputWithCopy = ({ value }: InputWithCopyProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 500);
  };

  return (
    <div className="flex w-full">
      <Input
        disabled
        defaultValue={value}
        className="font-mono text-sm rounded-r-none"
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
