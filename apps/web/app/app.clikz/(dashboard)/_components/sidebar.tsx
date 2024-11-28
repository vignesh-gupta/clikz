"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, Link2, Settings, Zap } from "lucide-react";

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
import { useWorkspaceSlug } from "~/lib/hooks/use-workspace-slug";

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
    title: "Events",
    href: "/events",
    icon: Zap,
  },
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
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Link2 className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Clikz</span>
            <span className="text-xs text-muted-foreground">Free Plan</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={`/${slug}${item.href}`}>
              <SidebarMenuButton
                asChild
                isActive={pathname === `/${slug}${item.href}`}
                className="gap-2"
              >
                <Link href={`/${slug}${item.href}`}>
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
