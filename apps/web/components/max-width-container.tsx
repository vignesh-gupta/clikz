import { FC, PropsWithChildren } from "react";

import { GridPattern } from "@clikz/ui/components/ui/grid-pattern";
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
    <section className={cn("relative overflow-hidden", containerClassName)}>
      {showPattern && (
        <GridPattern
          width={size}
          height={size}
          className="[mask-image:linear-gradient(to_bottom,white,white,transparent)] opacity-10 stroke-gray-950/40"
        />
      )}
      <div className={cn("max-w-screen-xl mx-auto px-4 z-20", className)}>
        {children}
      </div>
    </section>
  );
};

export default MaxWidthContainer;
