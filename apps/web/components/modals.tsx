"use client";

import LinkModal from "~/features/link/components/link-modal";
import { useCreateLinkModel } from "~/features/link/hooks/use-create-link-modal";

const Modals = () => {
  const { isOpen: isLinkModal } = useCreateLinkModel();

  if (!isLinkModal) return null;

  return (
    <>
      <LinkModal />
    </>
  );
};

export default Modals;
