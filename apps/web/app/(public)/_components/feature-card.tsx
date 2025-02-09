import { ReactNode } from "react";

import { cn } from "@clikz/ui/lib/utils";

type FeatureCardProps = {
  title: string;
  description?: string;
  headNode?: ReactNode;
  className?: string;
};

const FeatureCard = ({
  title,
  description,
  headNode,
  className,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "col-span-1 flex flex-col items-center justify-center h-96 rounded-lg bg-gradient-to-b from-gray-400 to-gray-200 bg-opacity-70",
        className
      )}
    >
      {title}
    </div>
  );
};

export default FeatureCard;
