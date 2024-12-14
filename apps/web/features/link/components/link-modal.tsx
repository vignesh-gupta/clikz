import ResponsiveModal from "@clikz/ui/components/responsive-dialog";

import { useCreateLinkModel } from "../hooks/use-create-link-modal";
import CreateLinkForm from "./create-link-form";

const LinkModal = () => {
  const { isOpen, setIsOpen } = useCreateLinkModel();
  return (
    <ResponsiveModal open={isOpen} onOpen={setIsOpen} className="rounded-xl">
      <CreateLinkForm />
    </ResponsiveModal>
  );
};

export default LinkModal;
