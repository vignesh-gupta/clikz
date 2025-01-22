import { memo } from "react";

import { Avatar, AvatarImage } from "@clikz/ui/components/ui/avatar";
import { Skeleton } from "@clikz/ui/components/ui/skeleton";
import { cn } from "@clikz/ui/lib/utils";

type WorkspaceAvatarProps = {
  image?: string;
  name: string;
  className?: string;
  height?: number;
  width?: number;
  isLoading?: boolean;
};

const WorkspaceAvatar = ({
  name,
  className,
  image,
  height,
  width,
  isLoading,
}: WorkspaceAvatarProps) => {
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

  const defaultAvatarUrl = `https://api.dicebear.com/9.x/thumbs/svg?seed=${name}`;

  return (
    <Avatar className={className}>
      <AvatarImage
        src={image || defaultAvatarUrl}
        className="size-full object-cover"
        height={height}
        width={width}
      />
    </Avatar>
  );
};

export default memo(WorkspaceAvatar);
