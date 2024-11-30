import { useQueryState } from "nuqs";

export const useView = () => {
  return useQueryState<"grid" | "row">("view", {
    parse: (val) => (val === "grid" || val === "row" ? val : "grid"),
    defaultValue: "grid",
    clearOnDefault: true,
  });
};
