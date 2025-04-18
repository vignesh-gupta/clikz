import ResponsiveModal from "@clikz/ui/components/responsive-dialog";

import { useLinkModel } from "../hooks/use-link-modal";
import LinkForm from "./link-form";

const LinkModal = () => {
  const { linkId, close } = useLinkModel();
  return (
    <ResponsiveModal
      open={!!linkId}
      onOpen={close}
      className="rounded-xl w-full"
      title={linkId === "new" ? "Create Link" : "Edit Link"}
    >
      <LinkForm />
    </ResponsiveModal>
  );
};

export default LinkModal;
