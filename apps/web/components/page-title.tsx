"use client";

import { MenuIcon } from "lucide-react";

import { Button } from "@clikz/ui/components/ui/button";
import { useSidebar } from "@clikz/ui/components/ui/sidebar";
import { cn } from "@clikz/ui/lib/utils";

import { UserButton } from "~/features/auth/components/user-button";

type PageTitleProps = {
  title?: string;
  className?: string;
};

const PageTitle = ({ title, className }: PageTitleProps) => {
  const { isMobile, toggleSidebar } = useSidebar();

  return (
    <div className={cn("flex my-2 justify-between items-center", className)}>
      <div className="flex items-center gap-2">
        {isMobile ? (
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <MenuIcon size={24} />
          </Button>
        ) : null}
        {title ? (
          <h1 className="text-xl font-semibold leading-7 text-neutral-900 md:text-2xl">
            {title}
          </h1>
        ) : null}
      </div>

      <UserButton align="end" className="md:hidden" />
    </div>
  );
};

export default PageTitle;
