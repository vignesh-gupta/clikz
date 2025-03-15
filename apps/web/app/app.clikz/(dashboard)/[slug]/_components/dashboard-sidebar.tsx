"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { BarChart2, Link2, Settings } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

import { Button } from "@clikz/ui/components/ui/button";
import { Progress } from "@clikz/ui/components/ui/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@clikz/ui/components/ui/sidebar";

import { UserButton } from "~/features/auth/components/user-button";
import WorkspaceSwitcher from "~/features/workspace/components/workspace-switcher";
import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";

import { SettingsSidebarHeader, settingsNavigation } from "./settings-sidebar";

const navigation = [
  {
    title: "Links",
    href: "",
    icon: Link2,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart2,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const slug = useWorkspaceSlug();
  const isSettingsPage = pathname.startsWith(`/${slug}/settings`);

  const { setOpenMobile } = useSidebar();

  const handleClick = (href: string) => {
    router.push(`/${slug}${href}`);
    setOpenMobile(false);
  };

  const currentNavigation = isSettingsPage ? settingsNavigation : navigation;

  return (
    <Sidebar className="bg-slate-700">
      <AnimatePresence mode="wait">
        <motion.div
          key={
            isSettingsPage
              ? "settings-sidebar-header"
              : "dashboard-sidebar-header"
          }
          initial={{ opacity: 0, x: isSettingsPage ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isSettingsPage ? 50 : -50 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          {isSettingsPage ? (
            <SettingsSidebarHeader slug={slug} />
          ) : (
            <SidebarHeader className="my-4 flex-row justify-between items-center">
              <Image
                src="/logo-name.png"
                width={150}
                height={46}
                alt="Clikz Logo"
                className="w-28 h-auto"
                priority
              />
              <UserButton align="start" alignOffset={0} />
            </SidebarHeader>
          )}
          <SidebarContent className="px-4 pt-2">
            {!isSettingsPage && <WorkspaceSwitcher />}
            <SidebarMenu>
              {currentNavigation.map((item) => (
                <SidebarMenuItem key={`/${slug}${item.href}`}>
                  <SidebarMenuButton
                    isActive={pathname === `/${slug}${item.href}`}
                    onClick={() => handleClick(item.href)}
                    className="hover:text-foreground transition-all data-[active=true]:text-blue-700 data-[active=true]:bg-blue-200/25"
                  >
                    <item.icon className="size-4" />
                    {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </motion.div>
      </AnimatePresence>
      <SidebarFooter>
        <div className="space-y-4 px-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Links used</span>
              <span className="text-muted-foreground">0 of 25</span>
            </div>
            <Progress value={0} className="h-1" />
          </div>
          <Button className="w-full" size="sm">
            Upgrade to Pro
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
