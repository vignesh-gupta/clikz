import { Link2, Plus } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";

import PageFilters from "../_components/filter";

export type PageWithSlugParams = {
  params: {
    slug: string;
  };
};

const WorkspaceLinkPage = () => {
  return (
    <div className="flex h-full flex-col flex-1">
      <div className="p-6">
        <h1 className="text-lg font-semibold">Links</h1>
      </div>
      <div className="flex-1 space-y-4 p-8">
        <PageFilters />
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Link2 className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mt-6 text-xl font-semibold">No links found</h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Start creating short links for your marketing campaigns, referral
              programs, and more.
            </p>
            <div className="mt-6 flex gap-2">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create link
              </Button>
              <Button variant="outline">Learn more</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceLinkPage;
