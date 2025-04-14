"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronLeft, CogIcon, ShieldCheckIcon } from "lucide-react";

import { buttonVariants } from "@clikz/ui/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@clikz/ui/components/ui/sidebar";
import { DEFAULT_LOGIN_REDIRECT } from "@clikz/utils/constants";

import { UserButton } from "~/features/auth/components/user-button";

const navItems = [
  {
    title: "General",
    url: "/account/settings",
    icon: CogIcon,
  },
  {
    title: "Security",
    url: "/account/settings/security",
    icon: ShieldCheckIcon,
  },
];

const AccountSettingsSidebar = () => {
  const path = usePathname();

  return (
    <Sidebar className="bg-slate-50">
      <SidebarHeader className="flex-row justify-between items-center pr-4 pt-4">
        <Link
          href={DEFAULT_LOGIN_REDIRECT}
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
      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-1">Account</SidebarGroupLabel>
          <SidebarGroupContent className="text-muted-foreground/50">
            <SidebarMenu className="pl-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={path === item.url}
                    className="hover:text-foreground transition-all data-[active=true]:text-blue-700 data-[active=true]:bg-blue-200/25"
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AccountSettingsSidebar;
