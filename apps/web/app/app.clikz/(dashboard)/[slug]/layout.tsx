import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

import { SidebarInset, SidebarProvider } from "@clikz/ui/components/ui/sidebar";

import MaxWidthContainer from "~/components/max-width-container";
import { db } from "~/lib/db";

import { DashboardSidebar } from "../_components/sidebar";
import { PageWithSlugParams } from "./page";

type DashboardLayoutProps = PropsWithChildren<PageWithSlugParams>;

export default async function DashboardLayout({
  params,
  children,
}: DashboardLayoutProps) {
  const { slug } = await params;
  const workspace = await db.workspace.findUnique({
    where: { slug },
  });

  if (!workspace) return notFound();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <SidebarInset className="">
          <MaxWidthContainer className="mt-6 md:py-3">
            {children}
          </MaxWidthContainer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
