"use client";

import LinkModal from "~/features/link/components/link-modal";
import { useLinkModel } from "~/features/link/hooks/use-link-modal";
import WorkspaceModal from "~/features/workspace/components/workspace-modal";
import { useWorkspaceModel } from "~/features/workspace/hooks/use-workspace-modal";

const Modals = () => {
  const { linkId: isLinkModal } = useLinkModel();
  const { wsId: isWsModal } = useWorkspaceModel();

  if (!isLinkModal && !isWsModal) return null;

  return (
    <>
      <LinkModal />
      <WorkspaceModal />
    </>
  );
};

export default Modals;
