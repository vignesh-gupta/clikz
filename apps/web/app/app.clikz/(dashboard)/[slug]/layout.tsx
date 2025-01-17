import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

import { SidebarInset, SidebarProvider } from "@clikz/ui/components/ui/sidebar";

import { auth } from "~/auth";
import MaxWidthContainer from "~/components/max-width-container";
import { db } from "~/lib/db";

import { DashboardSidebar } from "../_components/sidebar";
import { PageWithSlugParams } from "./page";

type DashboardLayoutProps = PropsWithChildren<PageWithSlugParams>;

export default async function DashboardLayout({
  params,
  children,
}: DashboardLayoutProps) {
  const session = await auth();
  if (!session || !session.user) return notFound();

  const { slug } = await params;

  const workspace = await db.workspace.findUnique({
    where: { slug },
  });

  if (!workspace) return notFound();

  const members = await db.membership.findFirst({
    where: {
      userId: session.user?.id,
      workspaceId: workspace.id,
    },
  });

  if (!members) return notFound();

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
