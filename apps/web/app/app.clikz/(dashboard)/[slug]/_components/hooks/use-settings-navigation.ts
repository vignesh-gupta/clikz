import { parseAsString, useQueryState } from "nuqs";

export const TAB_QUERY_PARAM = "tab";

export const useSettingsNavigation = (val: string) => {
  const [tab, setTab] = useQueryState(
    TAB_QUERY_PARAM,
    parseAsString.withDefault(val).withOptions({
      clearOnDefault: true,
    })
  );

  return {
    tab,
    setTab,
  };
};
