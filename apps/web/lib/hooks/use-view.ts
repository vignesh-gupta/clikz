import { useQueryState } from "nuqs";

export const useView = () => {
  const [view, setView] = useQueryState<"card" | "row">("view", {
    parse: (val) => (val === "card" || val === "row" ? val : "card"),
    defaultValue: "card",
  });

  return { view, setView };
};
