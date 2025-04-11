import { parseAsString, useQueryState } from "nuqs";

export const LINK_QUERY_PARAM = "link";

export const useLinkModel = () => {
  const [linkId, setLinkId] = useQueryState(LINK_QUERY_PARAM, parseAsString);

  return {
    linkId,
    open: (value: string) => setLinkId(value),
    close: () => setLinkId(null),
    setLinkId,
  };
};
