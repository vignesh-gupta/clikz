import { cn } from "@repo/ui/lib/utils";
import { GridPattern } from "@repo/ui/components/ui/grid-pattern";
import React, { FC, PropsWithChildren } from "react";

type MaxWidthContainerProps = PropsWithChildren<{
  className?: string;
  showPattern?: boolean;
}>;

const MaxWidthContainer: FC<MaxWidthContainerProps> = ({
  children,
  className,
  showPattern,
}) => {
  return (
    <main
      className={cn(
        "animate-fade-in h-screen relative overflow-hidden",
        className,
      )}
    >
      {showPattern && (
        <GridPattern
          width={20}
          height={20}
          className={cn(
            "[mask-image:linear-gradient(to_bottom,white,white,transparent)] opacity-10 stroke-gray-950/40",
          )}
        />
      )}
      <div className="max-w-4xl mx-auto px-8 z-20">{children}</div>
    </main>
  );
};

export default MaxWidthContainer;
