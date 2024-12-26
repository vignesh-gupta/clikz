import { parseAsBoolean, useQueryState } from "nuqs";

export const NEW_LINK_QUERY_PARAM = "new-link";

export const useCreateLinkModel = () => {
  const [isOpen, setIsOpen] = useQueryState(
    NEW_LINK_QUERY_PARAM,
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
