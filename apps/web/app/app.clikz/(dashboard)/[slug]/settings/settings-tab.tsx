"use client";

import { Workspace } from "@prisma/client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@clikz/ui/components/ui/tabs";

import { useGetWorkspace } from "~/features/workspace/api/workspace/use-get-workspace";

import GeneralSettings from "../_components/general-settings";
import { useSettingsNavigation } from "../_components/hooks/use-settings-navigation";
import TeamSettings from "../_components/teams/team-settings";

type SettingsTabProps = {
  initialWorkspace: Workspace;
};

const SettingsTab = ({ initialWorkspace }: SettingsTabProps) => {
  const { tab, setTab } = useSettingsNavigation("general");

  const { data: workspace } = useGetWorkspace({
    idOrSlug: initialWorkspace.id,
    initialData: initialWorkspace,
  });

  return (
    <Tabs value={tab} className="space-y-6">
      <TabsList className="rounded-none bg-background">
        <TabsTrigger
          value="general"
          onClick={() => setTab("general")}
          className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background"
        >
          General
        </TabsTrigger>
        <TabsTrigger
          value="team"
          onClick={() => setTab("team")}
          className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background"
        >
          Team
        </TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="p-1">
        <GeneralSettings
          workspaceId={initialWorkspace.id}
          name={workspace?.name!}
          slug={workspace?.slug!}
          icon={workspace?.icon ?? undefined}
        />
      </TabsContent>
      <TabsContent value="team" className="p-1">
        <TeamSettings />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTab;
