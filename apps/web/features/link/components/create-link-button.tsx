"use client";

import { Button } from "@clikz/ui/components/ui/button";

import { useCreateLinkModel } from "../hooks/use-create-link-modal";

const CreateLinkButton = () => {
  const { open } = useCreateLinkModel();

  const handleClick = () => {
    console.log("Create link button clicked");
    open();
  };

  return (
    <Button shortcut="c" onClick={handleClick}>
      Create
    </Button>
  );
};

export default CreateLinkButton;
