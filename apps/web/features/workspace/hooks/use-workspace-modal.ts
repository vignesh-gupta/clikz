import { parseAsString, useQueryState } from "nuqs";

export const NEW_WS_QUERY_PARAM = "ws";

export const useWorkspaceModel = () => {
  const [wsId, setWsId] = useQueryState(NEW_WS_QUERY_PARAM, parseAsString);

  return {
    wsId,
    open: (id: string) => setWsId(id),
    close: () => setWsId(null),
    setWsId,
  };
};
