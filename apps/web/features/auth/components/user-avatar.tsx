import { memo } from "react";

import { Avatar, AvatarImage } from "@clikz/ui/components/ui/avatar";
import { Skeleton } from "@clikz/ui/components/ui/skeleton";
import { cn } from "@clikz/ui/lib/utils";

type UserAvatarProps = {
  image?: string | null;
  email: string;
  className?: string;
  isLoading?: boolean;
};

const UserAvatar = ({
  email,
  image,
  className,
  isLoading,
}: UserAvatarProps) => {
  if (isLoading)
    return <Skeleton className={cn("rounded-full size-8", className)} />;

  return (
    <Avatar className={cn("size-8", className)}>
      <AvatarImage
        src={
          image ?? `https://api.dicebear.com/9.x/open-peeps/svg?seed=${email}`
        }
      />
    </Avatar>
  );
};

export default memo(UserAvatar);
