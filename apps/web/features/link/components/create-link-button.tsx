"use client";

import { useKeyboardShortcut } from "@clikz/ui";
import { Button } from "@clikz/ui/components/ui/button";

import { useLinkModel } from "../hooks/use-link-modal";

const CreateLinkButton = () => {
  const { open } = useLinkModel();

  const handleCreate = () => open("new");

  useKeyboardShortcut("c", handleCreate);

  return (
    <Button onClick={handleCreate} shortcut="c">
      Create
    </Button>
  );
};

export default CreateLinkButton;
