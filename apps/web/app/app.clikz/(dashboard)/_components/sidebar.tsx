"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BarChart2, Link2, Settings } from "lucide-react";

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
} from "@clikz/ui/components/ui/sidebar";
import { cn } from "@clikz/ui/lib/utils";

import WorkspaceSwitcher from "~/features/workspace/components/workspace-switcher";
import { useWorkspaceSlug } from "~/features/workspace/hooks/use-workspace-slug";

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
  // {
  //   title: "Events",
  //   href: "/events",
  //   icon: Zap,
  // },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  const slug = useWorkspaceSlug();

  return (
    <Sidebar>
      <SidebarHeader>
        <p className={cn("px-4 py-2 text-3xl")}>Clikz</p>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <div className="my-4">
          <WorkspaceSwitcher />
        </div>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={`/${slug}${item.href}`}>
              <SidebarMenuButton
                asChild
                isActive={pathname === `/${slug}${item.href}`}
                className="gap-2"
              >
                <Link href={`/${slug}${item.href}`} prefetch={false}>
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
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
