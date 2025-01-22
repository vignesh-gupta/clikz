"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@clikz/ui/components/ui/tabs";

import { useGetWorkspace } from "~/features/workspace/api/workspace/use-get-workspace";
import { WorkspaceProp } from "~/lib/types";

import GeneralSettings from "../_components/general-settings";
import { useSettingsNavigation } from "../_components/hooks/use-settings-navigation";
import TeamSettings from "../_components/teams/team-settings";

type SettingsTabProps = {
  initialWorkspace: WorkspaceProp;
};

const SettingsTab = ({ initialWorkspace }: SettingsTabProps) => {
  const { tab, setTab } = useSettingsNavigation("general");

  const { data: workspace } = useGetWorkspace({
    workspaceId: initialWorkspace.id,
    initialData: initialWorkspace,
  });

  return (
    <Tabs value={tab} className="space-y-6">
      <TabsList>
        <TabsTrigger value="general" onClick={() => setTab("general")}>
          General
        </TabsTrigger>
        <TabsTrigger value="team" onClick={() => setTab("team")}>
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
        <TeamSettings workspaceId={initialWorkspace.id} />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTab;
