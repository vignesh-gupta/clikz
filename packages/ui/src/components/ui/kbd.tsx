import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@clikz/ui/lib/utils";

const kbdVariants = cva(
  "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono font-medium",
  {
    variants: {
      variant: {
        default: "bg-muted-foreground/50 text-muted border-muted-foreground/20",
        primary: "bg-primary/10 text-primary border-primary/20",
        destructive: "bg-destructive-foreground/30 border-destructive/20",
        outline: "bg-gray-300 text-foreground border-input",
        secondary: "bg-secondary/10 text-secondary border-secondary/20",
        ghost: "bg-gray-300 text-foreground border-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <kbd
        className={cn(kbdVariants({ variant, className }))}
        {...props}
        ref={ref}
      />
    );
  },
);
Kbd.displayName = "Kbd";

export { Kbd, kbdVariants };
