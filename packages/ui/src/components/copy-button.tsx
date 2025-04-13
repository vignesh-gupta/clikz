import { MouseEvent, useState } from "react";

import { CheckIcon, CopyIcon } from "lucide-react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@clikz/ui/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

type CopyButtonProps = {
  value: string;
  className?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  onCopy?: () => void;
};

export const CopyButton = ({
  value,
  variant = "secondary",
  className,
  onCopy,
}: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (onCopy) return onCopy();

    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard  btn successfully");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 500);
  };

  return (
    <Button
      onClick={copyToClipboard}
      variant={variant}
      className={cn("p-3", className)}
    >
      {isCopied ? <CheckIcon /> : <CopyIcon />}
      <span className="sr-only">Copy</span>
    </Button>
  );
};
