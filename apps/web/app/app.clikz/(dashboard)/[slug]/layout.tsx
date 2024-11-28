import { SidebarInset, SidebarProvider } from "@clikz/ui/components/ui/sidebar";
import { DashboardSidebar } from "../_components/sidebar";
import MaxWidthContainer from "~/components/max-width-container";
import { PropsWithChildren } from "react";
import { PageWithSlugParams } from "./page";
import { db } from "~/lib/db";
import { notFound } from "next/navigation";

type DashboardLayoutProps = PropsWithChildren<PageWithSlugParams>

export default async function DashboardLayout({ params: { slug },children }: DashboardLayoutProps) {

  const workspace = await db.workspace.findUnique({
    where: {
      slug: slug,
    },
  })

  if(!workspace) return notFound()
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <SidebarInset className="">
          <MaxWidthContainer className="max-w-6xl">
            {children}
          </MaxWidthContainer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
