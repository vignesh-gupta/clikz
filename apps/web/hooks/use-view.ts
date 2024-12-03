import { useQueryState } from "nuqs";

export const useView = () => {
  const [view, setView] = useQueryState<"grid" | "row">("view", {
    parse: (val) => (val === "grid" || val === "row" ? val : "grid"),
    defaultValue: "grid",
    clearOnDefault: false
  });

  return { view, setView };
};
