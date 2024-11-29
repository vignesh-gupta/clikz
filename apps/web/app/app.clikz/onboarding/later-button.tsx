"use client";

import { buttonVariants } from "@clikz/ui/components/ui/button";
import { cn } from "@clikz/ui/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const STEPS = [
  "/onboarding/welcome",
  "/onboarding/invite",
  "/onboarding/link",
  "/onboarding/done",
];

const LaterButton = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const workspaceId = searchParams.get("workspaceId");

  const nextStepUrl = `${STEPS[STEPS.indexOf(pathname) + 1]}${workspaceId ? `?workspaceId=${workspaceId}` : ""}`;

  return (
    <Link
      href={nextStepUrl}
      className={cn(
        buttonVariants({
          variant: "link",
          className: "w-full text-center mt-4",
        }),
      )}
    >
      I'll do it later
    </Link>
  );
};

export default LaterButton;
