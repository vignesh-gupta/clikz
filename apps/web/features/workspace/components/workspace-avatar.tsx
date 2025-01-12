import { memo } from "react";

import { Avatar, AvatarImage } from "@clikz/ui/components/ui/avatar";

type WorkspaceAvatarProps = {
  image?: string;
  name: string;
  className?: string;
  height?: number;
  width?: number;
};

const WorkspaceAvatar = ({
  name,
  className,
  image,
  height,
  width,
}: WorkspaceAvatarProps) => {
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
