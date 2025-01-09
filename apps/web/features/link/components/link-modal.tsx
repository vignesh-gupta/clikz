import ResponsiveModal from "@clikz/ui/components/responsive-dialog";

import { useLinkModel } from "../hooks/use-link-modal";
import CreateLinkForm from "./create-link-form";

const LinkModal = () => {
  const { linkId, close } = useLinkModel();
  return (
    <ResponsiveModal
      open={!!linkId}
      onOpen={close}
      className="rounded-xl w-full"
    >
      <CreateLinkForm />
    </ResponsiveModal>
  );
};

export default LinkModal;
