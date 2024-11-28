"use client";

import { Button } from "@clikz/ui/components/ui/button";
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
    <Button variant="link" asChild className="w-full text-center mt-4">
      <Link href={nextStepUrl}>I'll do it later</Link>
    </Button>
  );
};

export default LaterButton;
