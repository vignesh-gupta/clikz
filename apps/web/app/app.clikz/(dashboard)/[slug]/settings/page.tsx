import { notFound } from "next/navigation";

import PageHeader from "~/components/page-header";
import { db } from "~/lib/db";
import { PageWithSlugParams } from "~/types/pages.types";

import GeneralSettings from "../_components/general-settings";

const WorkspaceSettingPage = async ({ params }: PageWithSlugParams) => {
  const { slug } = await params;

  const workspace = await db.workspace.findUnique({
    where: { slug },
  });

  if (!workspace) notFound();

  return (
    <>
      <PageHeader />
      <GeneralSettings initialWorkspace={workspace} />
    </>
  );
};

export default WorkspaceSettingPage;
