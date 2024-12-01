import { Link2, PlusIcon } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";

const NoLinks = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center rounded-full bg-muted">
          <Link2 className="size-10 text-muted-foreground" />
        </div>
        <h2 className="mt-6 text-xl font-semibold">No links found</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground text-pretty max-w-lg">
          Start creating short links for your marketing campaigns, referral
          programs, and more.
        </p>
        <div className="mt-6 flex gap-2">
          <Button icon={<PlusIcon />}>Create Link</Button>
          <Button variant="outline">Learn more</Button>
        </div>
      </div>
    </div>
  );
};

export default NoLinks;
