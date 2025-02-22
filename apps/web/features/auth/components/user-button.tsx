"use client";

import Link from "next/link";

import { LogOutIcon, User2Icon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { Button, buttonVariants } from "@clikz/ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@clikz/ui/components/ui/popover";
import { cn } from "@clikz/ui/lib/utils";

import UserAvatar from "~/features/auth/components/user-avatar";

type UserButtonProps = {
  name?: string;
  email?: string;
  className?: string;
  align?: "start" | "center" | "end";
  alignOffset?: number;
};

export function UserButton({ align, alignOffset, className }: UserButtonProps) {
  const { data } = useSession();

  if (!data || !data.user || !data.user.email) {
    return null;
  }

  const { email, image, name } = data.user;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className={cn("rounded-full", className)}
        >
          <UserAvatar email={email} image={image} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-64 shadow-xl p-2"
        alignOffset={alignOffset}
      >
        <p className="text-sm pl-3 font-medium">
          {name ?? email.split("@").at(0)}
        </p>
        <p className="text-xs pl-3 text-gray-500">{email}</p>
        <div className="mt-2">
          <Link
            href="/account/settings"
            className={buttonVariants({
              variant: "ghost",
              className: "w-full flex items-center !justify-start",
            })}
          >
            <User2Icon className="size-4 mr-1" />
            Account Settings
          </Link>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start text-destructive"
            onClick={() => signOut()}
          >
            <LogOutIcon className="size-4 mr-1" />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
