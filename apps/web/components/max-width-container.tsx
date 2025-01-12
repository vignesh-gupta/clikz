import { FC, PropsWithChildren } from "react";

import { GridPattern } from "@clikz/ui/components/ui/grid-pattern";
import { cn } from "@clikz/ui/lib/utils";

type MaxWidthContainerProps = PropsWithChildren<{
  className?: string;
  containerClassName?: string;
  showPattern?: boolean;
}>;

const MaxWidthContainer: FC<MaxWidthContainerProps> = ({
  children,
  className,
  showPattern,
  containerClassName,
}) => {
  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {showPattern && (
        <GridPattern
          width={20}
          height={20}
          className={cn(
            "[mask-image:linear-gradient(to_bottom,white,white,transparent)] opacity-10 stroke-gray-950/40"
          )}
        />
      )}
      <div className={cn("max-w-screen-xl mx-auto px-4 z-20", className)}>
        {children}
      </div>
    </div>
  );
};

export default MaxWidthContainer;
