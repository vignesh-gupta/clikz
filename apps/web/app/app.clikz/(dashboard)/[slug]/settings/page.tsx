import { notFound } from "next/navigation";

import MaxWidthContainer from "~/components/max-width-container";
import { db } from "~/lib/db";

import { PageWithSlugParams } from "../page";
import SettingsTab from "./settings-tab";

const WorkspaceSettingPage = async ({ params }: PageWithSlugParams) => {
  const { slug } = await params;

  const workspace = await db.workspace.findUnique({
    where: { slug },
  });

  if (!workspace) notFound();

  return (
    <MaxWidthContainer>
      <div className="space-y-0.5 mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Workspace Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your workspace preferences and team
        </p>
      </div>

      <SettingsTab
        workspaceId={workspace.id}
        workspaceSlug={workspace.slug}
        workspaceName={workspace.name}
      />
    </MaxWidthContainer>
  );
};

export default WorkspaceSettingPage;
