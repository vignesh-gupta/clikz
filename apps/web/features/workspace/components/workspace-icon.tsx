import { memo } from "react";

import { Avatar, AvatarImage } from "@clikz/ui/components/ui/avatar";
import { Skeleton } from "@clikz/ui/components/ui/skeleton";
import { cn } from "@clikz/ui/lib/utils";
import { getWorkspaceURL } from "@clikz/utils/functions";

type WorkspaceIconProps = {
  image?: string | null;
  name: string;
  className?: string;
  height?: number;
  width?: number;
  isLoading?: boolean;
};

const WorkspaceIcon = ({
  name,
  className,
  image,
  height,
  width,
  isLoading,
}: WorkspaceIconProps) => {
  if (isLoading) {
    return (
      <Skeleton
        className={cn(
          "rounded-full",
          className,
          `h-[${height}px] w-[${width}px]`
        )}
      />
    );
  }

  return (
    <Avatar className={className}>
      <AvatarImage
        src={getWorkspaceURL(name, image)}
        className="object-cover size-full"
        height={height}
        width={width}
      />
    </Avatar>
  );
};

export default memo(WorkspaceIcon);
