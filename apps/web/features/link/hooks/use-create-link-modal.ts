import { parseAsBoolean, useQueryState } from "nuqs";

export const useCreateLinkModel = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "new-link",
    parseAsBoolean.withDefault(false).withOptions({
      clearOnDefault: true,
    })
  );

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    setIsOpen,
  };
};
