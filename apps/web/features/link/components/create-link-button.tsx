"use client";

import { useKeyboardShortcut } from "@clikz/ui";
import { Button } from "@clikz/ui/components/ui/button";

import { useCreateLinkModel } from "../hooks/use-create-link-modal";

const CreateLinkButton = () => {
  const { open } = useCreateLinkModel();

  useKeyboardShortcut("c", () => open());

  return <Button onClick={() => open()}>Create</Button>;
};

export default CreateLinkButton;
