import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@clikz/ui/components/ui/dropdown-menu";
import React from "react";

type FilterDropdownProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

const FilterDropdown = ({ children, trigger }: FilterDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="start">{children}</DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
