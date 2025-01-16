"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@clikz/ui/components/ui/tabs";

import GeneralSettings from "../_components/general-settings";
import { useSettingsNavigation } from "../_components/hooks/use-settings-navigation";
import TeamSettings from "../_components/teams/team-settings";

type SettingsTabProps = {
  workspaceId: string;
  workspaceSlug: string;
  workspaceName: string;
};

const SettingsTab = ({
  workspaceId,
  workspaceName,
  workspaceSlug,
}: SettingsTabProps) => {
  const { tab, setTab } = useSettingsNavigation("general");

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
          workspaceId={workspaceId}
          name={workspaceName}
          slug={workspaceSlug}
        />
      </TabsContent>
      <TabsContent value="team" className="p-1">
        <TeamSettings workspaceId={workspaceId} />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTab;
