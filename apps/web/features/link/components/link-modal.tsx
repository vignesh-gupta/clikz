import ResponsiveModal from "@clikz/ui/components/responsive-dialog";

import { useCreateLinkModel } from "../hooks/use-create-link-modal";
import CreateLinkForm from "./create-link-form";

const LinkModal = () => {
  const { isOpen, setIsOpen } = useCreateLinkModel();

  console.log("LinkModal rendered");

  return (
    <ResponsiveModal open={isOpen} onOpen={setIsOpen}>
      <CreateLinkForm />
    </ResponsiveModal>
  );
};

export default LinkModal;
