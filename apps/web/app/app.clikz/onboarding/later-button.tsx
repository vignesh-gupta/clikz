"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { buttonVariants } from "@clikz/ui/components/ui/button";
import { cn } from "@clikz/ui/lib/utils";

const STEPS = [
  "/onboarding/welcome",
  "/onboarding/invite",
  "/onboarding/link",
  "/onboarding/done",
];

const LaterButton = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const workspace = searchParams.get("workspace");

  const nextStepUrl = `${STEPS[STEPS.indexOf(pathname) + 1]}${workspace ? `?workspace=${workspace}` : ""}`;

  return (
    <Link
      href={nextStepUrl}
      className={cn(
        buttonVariants({
          variant: "link",
          className: "w-full text-center mt-4",
        })
      )}
    >
      I'll do it later
    </Link>
  );
};

export default LaterButton;
