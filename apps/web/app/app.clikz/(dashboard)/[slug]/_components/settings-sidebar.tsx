import Link from "next/link";

import { ChevronLeft, CogIcon, Globe2Icon, UsersIcon } from "lucide-react";

import { buttonVariants } from "@clikz/ui/components/ui/button";
import { SidebarHeader } from "@clikz/ui/components/ui/sidebar";

import { UserButton } from "~/features/auth/components/user-button";

type SettingsSidebarHeaderProps = {
  slug: string;
};

export const SettingsSidebarHeader = ({ slug }: SettingsSidebarHeaderProps) => {
  return (
    <SidebarHeader className="flex-row justify-between items-center pr-4 pt-4">
      <Link
        href={`/${slug}`}
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "w-auto group/bar gap-1 px-3 py-1",
        })}
      >
        <ChevronLeft className="group-hover/bar:-translate-x-0.5" /> Settings
      </Link>
      <UserButton align="start" />
    </SidebarHeader>
  );
};

export const settingsNavigation = [
  {
    title: "General",
    href: "/settings",
    icon: CogIcon,
  },
  {
    title: "Team",
    href: "/settings/team",
    icon: UsersIcon,
  },
  {
    title: "Domains",
    href: "/settings/domains",
    icon: Globe2Icon,
  },
];
