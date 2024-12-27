"use client";

import { Button } from "@clikz/ui/components/ui/button";

import { useCreateLinkModel } from "../hooks/use-create-link-modal";

const CreateLinkButton = () => {
  const { open } = useCreateLinkModel();
  return (
    <Button shortcut="c" onClick={() => open()}>
      Create
    </Button>
  );
};

export default CreateLinkButton;
