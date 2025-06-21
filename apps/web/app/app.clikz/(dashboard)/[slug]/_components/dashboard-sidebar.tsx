"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { BarChart2, Link2, Settings } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

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
import WorkspaceUsage from "./usage";

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
    <Sidebar>
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
        <WorkspaceUsage />
      </SidebarFooter>
    </Sidebar>
  );
}
