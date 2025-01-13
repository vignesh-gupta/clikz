import { parseAsString, useQueryState } from "nuqs";

export const TEAM_TAB_QUERY_PARAM = "group";

export const useTeamNavigation = (val: string) => {
  const [teamTab, setTeamTab] = useQueryState(
    TEAM_TAB_QUERY_PARAM,
    parseAsString.withDefault(val).withOptions({
      clearOnDefault: true,
    })
  );

  return {
    teamTab,
    setTeamTab,
  };
};
