import ResponsiveModal from "@clikz/ui/components/responsive-dialog";

import { useWorkspaceModel } from "../hooks/use-workspace-modal";
import CreateWorkspaceForm from "./create-workspace-form";

const WorkspaceModal = () => {
  const { wsId, close } = useWorkspaceModel();

  return (
    <ResponsiveModal
      open={!!wsId}
      onOpen={close}
      className="rounded-xl"
      title="Create a new workspace"
      titleClassName="sr-only"
    >
      <CreateWorkspaceForm />
    </ResponsiveModal>
  );
};

export default WorkspaceModal;
