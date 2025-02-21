import { notFound } from "next/navigation";

import PageTitle from "~/components/page-title";
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
    <>
      <PageTitle title="Workspace Settings" />
      <SettingsTab initialWorkspace={workspace} />
    </>
  );
};

export default WorkspaceSettingPage;
