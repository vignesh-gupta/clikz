import Image from "next/image";
import { memo } from "react";

import { Avatar, AvatarImage } from "@clikz/ui/components/ui/avatar";
import { cn } from "@clikz/ui/lib/utils";

type WorkspaceAvatarProps = {
  image?: string;
  name: string;
  className?: string;
};

const WorkspaceAvatar = ({ name, className, image }: WorkspaceAvatarProps) => {
  if (image)
    return (
      <div
        className={cn("size-10 relative rounded-md overflow-hidden", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );

  const defaultAvatarUrl = `https://api.dicebear.com/5.x/initials/svg?backgroundType=gradientLinear&fontFamily=Helvetica&fontSize=40&seed=${name}`;

  return (
    <Avatar className={cn("size-8 rounded-full", className)}>
      <AvatarImage src={defaultAvatarUrl} alt={name} />
    </Avatar>
  );
};

export default memo(WorkspaceAvatar);
