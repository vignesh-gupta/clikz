import { notFound } from "next/navigation";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@clikz/ui/components/ui/tabs";

import MaxWidthContainer from "~/components/max-width-container";
import { db } from "~/lib/db";

import GeneralSettings from "../_components/general-settings";
import TeamSettings from "../_components/team-settings";
import { PageWithSlugParams } from "../page";

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
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="p-1">
          <GeneralSettings
            workspaceId={workspace.id}
            name={workspace.name}
            slug={workspace.slug}
          />
        </TabsContent>
        <TabsContent value="team" className="p-1">
          <TeamSettings workspaceId={workspace.id} />
        </TabsContent>
      </Tabs>
    </MaxWidthContainer>
  );
};

export default WorkspaceSettingPage;
