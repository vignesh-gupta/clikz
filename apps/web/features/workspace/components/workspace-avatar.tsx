import Image from "next/image";

import { Avatar, AvatarFallback } from "@clikz/ui/components/ui/avatar";
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

  return (
    <Avatar className={cn("size-8 rounded-md", className)}>
      <AvatarFallback className="text-white bg-blue-600 font-semibold  uppercase rounded-md">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default WorkspaceAvatar;
