import { Button } from "@clikz/ui/components/ui/button";
import { DropdownMenuItem } from "@clikz/ui/components/ui/dropdown-menu";

import { useView } from "~/hooks/use-view";

import FilterDropdown from "./filter-dropdown";

const DisplayFilter = () => {
  const { setView } = useView();

  return (
    <FilterDropdown trigger={<Button variant="outline">Display</Button>}>
      <DropdownMenuItem onClick={() => setView("grid")}>Grid</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setView("row")}>Row</DropdownMenuItem>
    </FilterDropdown>
  );
};

export default DisplayFilter;
