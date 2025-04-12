import { FC, PropsWithChildren } from "react";

import { cn } from "@clikz/ui/lib/utils";

type MaxWidthContainerProps = PropsWithChildren<{
  className?: string;
  containerClassName?: string;
  showPattern?: boolean;
  size?: number;
}>;

const MaxWidthContainer: FC<MaxWidthContainerProps> = ({
  children,
  className,
  showPattern,
  containerClassName,
  size = 20,
}) => {
  return (
    <section
      className={cn("relative overflow-hidden", containerClassName)}
      style={
        showPattern
          ? {
              backgroundImage:
                "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
              backgroundSize: `${size}px ${size}px`,
            }
          : {}
      }
    >
      <div className={cn("max-w-screen-xl mx-auto px-4 z-20", className)}>
        {children}
      </div>
    </section>
  );
};

export default MaxWidthContainer;
