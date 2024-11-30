import { Button } from "@clikz/ui/components/ui/button";
import { Input } from "@clikz/ui/components/ui/input";
import { Separator } from "@clikz/ui/components/ui/separator";
import { Search } from "lucide-react";
import CreateLink from "./link/create-link";

const PageFilters = () => {
  return (
    <div className="flex justify-between my-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          Filter
        </Button>
        <Button variant="outline" size="sm">
          Display
        </Button>
        <Separator orientation="vertical" className="h-4" />
      </div>

      <div className="flex items-center justify-center gap-2">
        <div className="relative">
          <Input
            placeholder="Search"
            className="focus-visible:ring-gray-400 focus-visible:ring-offset-1 pl-8"
          />
          <Search className="size-4 absolute top-3 left-2 text-gray-600" />
        </div>
        <CreateLink />
      </div>
    </div>
  );
};

export default PageFilters;