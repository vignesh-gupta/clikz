import { Avatar, AvatarImage } from "@clikz/ui/components/ui/avatar";
import { cn } from "@clikz/ui/lib/utils";

type UserAvatarProps = {
  image?: string | null;
  email: string;
  className?: string;
};

const UserAvatar = ({ email, image, className }: UserAvatarProps) => {
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

export default UserAvatar;
