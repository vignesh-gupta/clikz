"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

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
  useSidebar,
} from "@clikz/ui/components/ui/sidebar";

import { UserButton } from "~/features/auth/components/user-button";
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
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { setOpenMobile } = useSidebar();

  const slug = useWorkspaceSlug();

  const handleClick = (href: string) => {
    router.push(`/${slug}${href}`);
    setOpenMobile(false);
  };

  return (
    <Sidebar className="bg-white">
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
      <SidebarContent className="px-4">
        <div className="my-4">
          <WorkspaceSwitcher />
        </div>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={`/${slug}${item.href}`}>
              <SidebarMenuButton
                isActive={pathname === `/${slug}${item.href}`}
                className="gap-2"
                onClick={() => handleClick(item.href)}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
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
