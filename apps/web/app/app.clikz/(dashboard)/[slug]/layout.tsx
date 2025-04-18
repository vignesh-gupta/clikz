import { notFound, redirect } from "next/navigation";
import { PropsWithChildren } from "react";

import { SidebarInset, SidebarProvider } from "@clikz/ui/components/ui/sidebar";

import { auth } from "~/auth";
import MaxWidthContainer from "~/components/max-width-container";
import { db } from "~/lib/db";
import { PageWithSlugParams } from "~/types/pages.types";

import { DashboardSidebar } from "./_components/dashboard-sidebar";

type DashboardLayoutProps = PropsWithChildren<PageWithSlugParams>;

export default async function DashboardLayout({
  params,
  children,
}: DashboardLayoutProps) {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    return redirect("/sign-in");

  const { slug } = await params;

  const workspace = await db.workspace.findUnique({
    where: {
      slug,
      Membership: {
        some: {
          userId: session.user.id,
        },
      },
    },
  });

  if (!workspace) return notFound();

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <DashboardSidebar />
        <SidebarInset>
          <MaxWidthContainer className="md:mt-6 md:py-3">
            {children}
          </MaxWidthContainer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
