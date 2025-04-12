import { validateInviteToken } from "~/lib/token";

import InviteAcceptance from "./_components/invite-acceptance";

type WorkspaceInvitePageProps = {
  params: Promise<{
    token: string;
  }>;
};

const WorkspaceInvitePage = async ({ params }: WorkspaceInvitePageProps) => {
  const { token } = await params;

  const { isValid, workspaceName, workspaceSlug } =
    await validateInviteToken(token);

  return (
    <InviteAcceptance
      isValidToken={isValid}
      workspaceName={workspaceName}
      workspaceSlug={workspaceSlug}
      token={token}
    />
  );
};

export default WorkspaceInvitePage;
