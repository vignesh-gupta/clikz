import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@clikz/ui/components/ui/tabs";

import MaxWidthContainer from "~/components/max-width-container";

import GeneralSettings from "../_components/general-settings";
import TeamSettings from "../_components/team-settings";
import { PageWithSlugParams } from "../page";

const WorkspaceSettingPage = async ({ params }: PageWithSlugParams) => {
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
        <TabsContent value="general" className="space-y-6 p-1">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="team" className="p-1">
          <TeamSettings />
        </TabsContent>
      </Tabs>
    </MaxWidthContainer>
  );
};

export default WorkspaceSettingPage;
